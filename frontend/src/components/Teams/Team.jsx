import { useState, useEffect } from "react";
import Loader from "react-loaders";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { letterContainerVariants, letterVariants } from "../../animations/textAnimations";
import { fadeInVariants } from "../../animations/elementAnimations";
import { cardContainerVariants, cardVariants } from "../../animations/cardAnimations";
import { buttonVariants } from "../../animations/elementAnimations";
import teamData from "../../jsondata/team.json";
import './index.scss';

const Team = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTeams, setFilteredTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            if (teamData && teamData.teams) {
                const filtered = teamData.teams.filter(team =>
                    team.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setFilteredTeams(filtered);
            } else {
                setError("Team data has incorrect format");
            }
        } catch (err) {
            console.error("Error processing teams data:", err);
            setError("Error processing teams data");
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
                        {filteredTeams.map((team) => (
                            <motion.div 
                                key={team.id}
                                className="team-card"
                                variants={cardVariants}
                                whileHover="hover"
                            >
                                <img src={team.logo} alt={team.name} />
                                <h3>{team.name}</h3>
                                <motion.div className="btn-container" whileHover="hover" variants={buttonVariants}>
                                    <Link to={`/teamdata?team=${encodeURIComponent(team.name)}`}>
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