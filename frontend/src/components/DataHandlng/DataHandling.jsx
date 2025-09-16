import { useState, useEffect} from 'react';
import axios from 'axios';

const DataHandling = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const teamVal = params.get('team');

        if (teamVal) {
            axios.get(`http://localhost:8080/api/v1/player?team=${encodeURIComponent(teamVal)}`)
                .then(response => {
                    setData(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

  return (
    <div className = "data-container">
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
            {data.map(player => (
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
    </div>
  );
  
};

export default DataHandling;