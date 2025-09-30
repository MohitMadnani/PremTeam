import { useState, useEffect } from "react";
import Loader from "react-loaders";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { letterContainerVariants, letterVariants } from "../../animations/textAnimations";
import { fadeInVariants } from "../../animations/elementAnimations";
import { cardContainerVariants, cardVariants } from "../../animations/cardAnimations";
import { buttonVariants } from "../../animations/elementAnimations";
import positionData from "../../jsondata/position.json";
import './index.scss';

const Positions = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPositions, setFilteredPositions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            if (positionData && positionData.positions) {
                const filtered = positionData.positions.filter(position =>
                    position.search.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (position.name && position.name.toLowerCase().includes(searchTerm.toLowerCase()))
                );
                setFilteredPositions(filtered);
            } else {
                setError("Position data has incorrect format");
            }
        } catch (err) {
            console.error("Error processing positions data:", err);
            setError("Error processing positions data");
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
            <div className="container positions-page">
                <motion.h1 
                    className="page-title"
                    variants={letterContainerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {"Positions".split("").map((letter, i) => (
                        <motion.span
                            key={i}
                            variants={letterVariants}
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
                >
                    <input
                        type="text"
                        placeholder="Search Positions..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    {searchTerm && (
                        <motion.button
                            onClick={handleClearSearch}
                            variants={buttonVariants}
                            whileHover={{scale: 1.1}}
                            whileTap={{scale: 0.9}}
                        >
                            Clear
                        </motion.button>
                    )}

                </motion.div>

                {isLoading ? (
                    <div className="loading">Loading positions...</div>
                ) : error ? (
                    <div className="error">{error}</div>
                ) : filteredPositions.length === 0 ? (
                    <motion.p
                        className="no-results"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        No positions found matching "{searchTerm}"
                    </motion.p>
                ) : (
                    <motion.div
                        className="cards-container"
                        variants={cardContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >   
                        {filteredPositions.map((position, index) => (
                                <motion.div
                                    className="position-card"
                                    key={index}
                                    variants={cardVariants}
                                    whileHover="hover"
                                >
                                    <div className="position-card-content">
                                        <h3>{position.name || position.search}</h3>
                                        {position.cover && (
                                            <div className="position-image">
                                                <img src={position.cover} alt={position.name || position.search} />
                                            </div>
                                        )}
                                        <motion.div
                                            className="btn-container"
                                            whileHover="hover"
                                            variants={buttonVariants}
                                        >
                                            <Link to={`/teamdata?position=${position.search}`}>
                                                VIEW PLAYERS
                                            </Link>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}
                    </motion.div>
                )}
            </div>
            <Loader type="pacman" />
        </>
    )
}

export default Positions;