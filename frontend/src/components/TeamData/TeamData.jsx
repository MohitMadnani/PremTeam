import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "react-loaders";
import AnimatedLetters from "../AnimatedLetters/Animletters";
import { motion } from "framer-motion";
import { fadeInVariants } from "../../animations/elementAnimations";
import { cardContainerVariants, cardVariants } from "../../animations/cardAnimations";
import axios from "axios";

const TeamData = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [playerData, setPlayerData] = useState([]);
    const [playersToShow, setPlayersToShow] = useState(10);
    const [searchParams] = useSearchParams();
    const teamName = searchParams.get('team');
    const [letterClass] = useState('text-animate');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const teamVal = params.get('team');
        const nationVal = params.get('nation');
        const posVal = params.get('position');
        const nameVal = params.get('name');

        if (teamVal) {
            const decodedTeamName = decodeURIComponent(teamVal);
            const formattedTeamName = decodedTeamName.replace(/\s+/g, '-');
            const finalUrl = `http://localhost:8080/api/v1/player?team=${formattedTeamName}`;
            
            console.log('Original teamVal:', teamVal);
            console.log('Decoded team name:', decodedTeamName);
            console.log('Formatted team name:', formattedTeamName);
            console.log('Final URL being called:', finalUrl);

            axios.get(finalUrl)
                .then(response => {
                    console.log('API Response:', response.data);
                    console.log('Number of players:', response.data.length);
                    setPlayerData(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('API Error:', error);
                    console.error('Error details:', error.response);
                    setError('Error fetching player data');
                    setLoading(false);
                });
        } else if (nationVal) {
            axios.get(`http://localhost:8080/api/v1/player?nation=${encodeURIComponent(nationVal)}`)
                .then(response => {
                    setPlayerData(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    setError('Error fetching player data');
                    setLoading(false);
                });
        } else if (posVal) {
            axios.get(`http://localhost:8080/api/v1/player?position=${encodeURIComponent(posVal)}`)
                .then(response => {
                    setPlayerData(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    setError('Error fetching player data');
                    setLoading(false);
                });

        } else if (nameVal) {
            axios.get(`http://localhost:8080/api/v1/player?name=${encodeURIComponent(nameVal)}`)
                .then(response => {
                    setPlayerData(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    setError('Error fetching player data');
                    setLoading(false);
                });
        } 
            else {
            setLoading(false);
         }
    }, [searchParams]);

    const loadMorePlayers = () => {
        setPlayersToShow(prev => prev + 10);
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <>
            <div className="container team-data-page">
                <h1 className="page-title">
                    <AnimatedLetters letterClass = {letterClass} strArray={(teamName || "Team Data").split("")} idx={15}/>
                </h1>
                
                <motion.div
                    className="player-container"
                    variants={cardContainerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {playerData.slice(0, playersToShow).map((player, idx) => (
                        <motion.div
                            key={idx}
                            className="player-card"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <h3>{player.name}</h3>
                            <p>Position: {player.pos}</p>
                            <p>Age: {player.age}</p>
                            <p>Matches Played: {player.mp}</p>
                            <p>Starts: {player.starts}</p>
                            <p>Minutes Played: {player.min}</p>
                            <p>Goals: {player.gls}</p>
                            <p>Assists: {player.ast}</p>
                            <p>Penalties Kicked: {player.pk}</p>
                            <p>Yellow Cards: {player.crdy}</p>
                            <p>Red Cards: {player.crdr}</p>
                            <p>Expected Goals (xG): {player.xg}</p>
                            <p>Expected Assists (xAG): {player.xag}</p>
                            <p>Team: {player.team}</p>
                        </motion.div>
                    ))}
                </motion.div>
                
                {playerData.length > playersToShow && (
                    <motion.button
                        className="load-more"
                        onClick={loadMorePlayers}
                        variants={fadeInVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Load More
                    </motion.button>
                )}
            </div>
            <Loader type="pacman"/>
        </>
    );
};

export default TeamData;
