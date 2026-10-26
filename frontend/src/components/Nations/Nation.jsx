import { useState, useEffect } from "react";
import Loader from "react-loaders";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";
import { letterContainerVariants, letterVariants } from "../../animations/textAnimations";
import { fadeInVariants, buttonVariants } from "../../animations/elementAnimations";
import { cardContainerVariants, cardVariants } from "../../animations/cardAnimations";
import { API_BASE_URL } from "../../api";
import countries from "../../jsondata/countries.json";
import "./index.scss";

const Nations = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [nations, setNations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/v1/player/nations`)
            .then(response => setNations(response.data.map(({ code, players }) => ({
                code,
                players,
                name: countries[code]?.name ?? code,
                flag: countries[code]?.flag,
            }))))
            .catch(() => setError("Could not load nations"))
            .finally(() => setIsLoading(false));
    }, []);

    const term = searchTerm.toLowerCase();
    const filteredNations = nations.filter(nation =>
        nation.name.toLowerCase().includes(term) || nation.code.toLowerCase().includes(term)
    );

    return (
        <>
            <div className="container nations-page">
                <motion.h1
                    className="page-title"
                    variants={letterContainerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {"Nations".split("").map((letter, i) => (
                        <motion.span key={i} variants={letterVariants} whileHover="hover">
                            {letter}
                        </motion.span>
                    ))}
                </motion.h1>

                <motion.div
                    className="search-bar"
                    variants={fadeInVariants}
                    initial="hidden"
                    animate="visible"
                    custom={0.5}
                >
                    <input
                        type="text"
                        placeholder="Search for nations"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <motion.button
                            className="clear-search"
                            onClick={() => setSearchTerm('')}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            ×
                        </motion.button>
                    )}
                </motion.div>

                {isLoading ? (
                    <div className="loading">Loading nations...</div>
                ) : error ? (
                    <div className="error">{error}</div>
                ) : filteredNations.length === 0 ? (
                    <motion.p className="no-results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        No nations found matching "{searchTerm}"
                    </motion.p>
                ) : (
                    <motion.div
                        className="nations-container"
                        variants={cardContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {filteredNations.map((nation) => (
                            <motion.div
                                key={nation.code}
                                className="nation-card"
                                variants={cardVariants}
                                whileHover="hover"
                            >
                                <div className="flag-container">
                                    {nation.flag && (
                                        <ReactCountryFlag
                                            countryCode={nation.flag}
                                            svg
                                            style={{ width: '200px', height: 'auto' }}
                                            title={nation.name}
                                            className="nation-flag"
                                        />
                                    )}
                                </div>
                                <h3>{nation.name}</h3>
                                <p className="nation-count">
                                    {nation.players} {nation.players === 1 ? "player" : "players"}
                                </p>
                                <motion.div whileHover="hover" variants={buttonVariants} className="btn-container">
                                    <Link to={`/teamdata?nation=${nation.code}`}>VIEW PLAYERS</Link>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
            <Loader type="pacman" />
        </>
    );
};

export default Nations;
