import { useState, useEffect } from "react";
import axios from "axios";
import AnimatedLetters from "../AnimatedLetters/AnimatedLetters";


const TeamData = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [playerData, setPlayerData] = useState([]);
    const [playersToShow, setPlayersToShow] = useState(10);
    const [letterClass] = useState('text-animate');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const teamVal = params.get('team');
        const nationVal = params.get('nation');
        const posVal = params.get('position');
        const nameVal = params.get('name');

        if (teamVal) {
            axios.get(`http://localhost:8080/api/v1/player?team=${encodeURIComponent(teamVal)}`)
                .then(response => {
                    setPlayerData(response.data);
                    setLoading(false);
                })
                .catch(error => {
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
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
    <div className={`fade-in ${loading ? 'loading' : ''}`}>
    <div className="table-container">
      <h1 className = "page-title">
        <AnimatedLetters letterClass = {letterClass} strArray={"Player Data".split("")} idx={12}/>
      </h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Age</th>
            <th>Matches Played</th>
            <th>Starts</th>
            <th>Minutes Played</th>
            <th>Goals</th>
            <th>Assists</th>
            <th>Penalties Kicked</th>
            <th>Yellow Cards</th>
            <th>Red Cards</th>
            <th>Expected Goals (xG)</th>
            <th>Expected Assists (xAG)</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {playerData.slice(0, playersToShow).map(player => (
            <tr key={player.name}>
              <td>{player.name}</td>
              <td>{player.pos}</td>
              <td>{player.age}</td>
              <td>{player.mp}</td>
              <td>{player.starts}</td>
              <td>{player.min}</td>
              <td>{player.gls}</td>
              <td>{player.ast}</td>
              <td>{player.pk}</td>
              <td>{player.crdy}</td>
              <td>{player.crdr}</td>
              <td>{player.xg}</td>
              <td>{player.xag}</td>
              <td>{player.team}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {playersToShow < playerData.length && (
        <button onClick={() => setPlayersToShow(playersToShow + 10)} style={{ marginTop: '10px', marginBottom: '10px' }} className={`show-more-button ${loading ? 'loading' : ''}`}>
          Show More
        </button>
      )}
    </div>
    </div>
  );
};

export default TeamData;
