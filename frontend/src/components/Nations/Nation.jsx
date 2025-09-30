import { useState, useEffect } from "react";
import Loader from "react-loaders";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { letterContainerVariants, letterVariants } from "../../animations/textAnimations";
import { fadeInVariants } from "../../animations/elementAnimations";
import { cardContainerVariants, cardVariants } from "../../animations/cardAnimations";
import { buttonVariants } from "../../animations/elementAnimations";
import ReactCountryFlag from "react-country-flag";
import nationsData from "../../jsondata/nation.json";
import "./index.scss";

const Nations = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredNations, setFilteredNations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            if (nationsData && nationsData.nations) {
                const filtered = nationsData.nations.filter(nation =>
                    nation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    nation.search.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setFilteredNations(filtered);
            } else {
                setError("Nation data has incorrect format");
            }
        } catch (err) {
            console.error("Error processing nations data:", err);
            setError("Error processing nations data");
        } finally {
            setIsLoading(false);
        }
    }, [searchTerm]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
    };
    
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
                        <motion.span
                            key={i}
                            variants={letterVariants}
                            whileHover="hover"
                        >
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
                        onChange={handleSearchChange}
                    />
                    {searchTerm && (
                        <motion.button
                            className="clear-search"
                            onClick={handleClearSearch}
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
                    <motion.p 
                        className="no-results"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        No nations found matching "{searchTerm}"
                    </motion.p>
                ) : (
                    <motion.div 
                        className="nations-container"
                        variants={cardContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {filteredNations.map((nation, index) => (
                            <motion.div 
                                key={index}
                                className="nation-card"
                                variants={cardVariants}
                                whileHover="hover"
                            >
                                <div className="flag-container">
                                    <ReactCountryFlag
                                        countryCode={nation.code}
                                        svg
                                        style={{
                                          width: '200px', // Match the CSS width
                                          height: 'auto'
                                        }}
                                        title={nation.name}
                                        className="nation-flag"
                                    />
                                </div>
                                <h3>{nation.name}</h3>
                                <motion.div 
                                    whileHover="hover"
                                    variants={buttonVariants}
                                    className="btn-container"
                                >
                                    <Link to={`/nations/${nation.code}`}>
                                        VIEW PLAYERS
                                    </Link>
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