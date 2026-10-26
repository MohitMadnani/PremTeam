import { useState, useEffect } from "react";
import Loader from "react-loaders";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { letterContainerVariants, letterVariants } from "../../animations/textAnimations";
import { fadeInVariants } from "../../animations/elementAnimations";
import { cardContainerVariants, cardVariants } from "../../animations/cardAnimations";
import { buttonVariants } from "../../animations/elementAnimations";
import axios from "axios";
import './index.scss';

import { API_BASE_URL } from "../../api";

const Team = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/v1/player/teams`)
            .then(response => setTeams(response.data))
            .catch(() => setError("Could not load teams"))
            .finally(() => setIsLoading(false));
    }, []);

    const filteredTeams = teams.filter(team =>
        team.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
    };
    
    return (
        <>
            <div className="container teams-page">
                <motion.h1 
                    className="page-title"
                    variants={letterContainerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {"Teams".split("").map((letter, i) => (
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
                        placeholder="Search for teams"
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
                    <div className="loading">Loading teams...</div>
                ) : error ? (
                    <div className="error">{error}</div>
                ) : filteredTeams.length === 0 ? (
                    <motion.p 
                        className="no-results"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        No teams found matching "{searchTerm}"
                    </motion.p>
                ) : (
                    <motion.div 
                        className="teams-container"
                        variants={cardContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {filteredTeams.map(({ name, code }) => (
                            <motion.div 
                                key={name}
                                className="team-card"
                                variants={cardVariants}
                                whileHover="hover"
                            >
                                <img src={`https://resources.premierleague.com/premierleague/badges/70/t${code}.png`} alt={name} />
                                <h3>{name}</h3>
                                <motion.div className="btn-container" whileHover="hover" variants={buttonVariants}>
                                    <Link to={`/teamdata?team=${encodeURIComponent(name)}`}>
                                        VIEW TEAM
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

export default Team;