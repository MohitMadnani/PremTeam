import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import AnimatedLetters from "../AnimatedLetters/Animletters";
import { fadeInVariants } from "../../animations/elementAnimations";
import { cardContainerVariants, cardVariants } from "../../animations/cardAnimations";
import { API_BASE_URL } from "../../api";
import positions from "../../jsondata/position.json";
import countries from "../../jsondata/countries.json";
import "./index.scss";

const PAGE_SIZE = 12;
const FILTERS = ["team", "nation", "position", "name"];

const SORTS = {
    min: { label: "Minutes played", compare: (a, b) => b.min - a.min },
    gls: { label: "Goals", compare: (a, b) => b.gls - a.gls || b.ast - a.ast },
    ast: { label: "Assists", compare: (a, b) => b.ast - a.ast || b.gls - a.gls },
    xg: { label: "Expected goals", compare: (a, b) => b.xg - a.xg },
    name: { label: "Name", compare: (a, b) => a.name.localeCompare(b.name) },
};

const positionTitle = (code) => positions.positions.find((p) => p.search === code)?.title ?? code;

const pageTitle = (filter, value) => {
    if (filter === "position") return positionTitle(value);
    if (filter === "nation") return countries[value?.toUpperCase()]?.name ?? value;
    if (filter === "name") return `"${value}"`;
    return value || "Players";
};

const Stat = ({ label, value }) => (
    <div className="stat">
        <span className="stat-value">{value}</span>
        <span className="stat-label">{label}</span>
    </div>
);

const PlayerCard = ({ player }) => (
    <motion.div className="player-card" variants={cardVariants} whileHover="hover">
        <div className="player-head">
            <div>
                <h3>{player.name}</h3>
                <p className="player-meta">
                    {player.team} · {player.nation} · {player.age} yrs
                </p>
            </div>
            <span className={`pos-badge pos-${player.pos}`}>{player.pos}</span>
        </div>

        <div className="key-stats">
            <Stat label="Goals" value={player.gls} />
            <Stat label="Assists" value={player.ast} />
            <Stat label="xG" value={player.xg.toFixed(1)} />
            <Stat label="xAG" value={player.xag.toFixed(1)} />
        </div>

        <dl className="detail-stats">
            <div><dt>Played</dt><dd>{player.mp}</dd></div>
            <div><dt>Starts</dt><dd>{player.starts}</dd></div>
            <div><dt>Minutes</dt><dd>{player.min}</dd></div>
            <div><dt>Yellow</dt><dd>{player.crdy}</dd></div>
            <div><dt>Red</dt><dd>{player.crdr}</dd></div>
            <div><dt>Pens missed</dt><dd>{player.pensMissed}</dd></div>
        </dl>
    </motion.div>
);

const TeamData = () => {
    const [searchParams] = useSearchParams();
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visible, setVisible] = useState(PAGE_SIZE);
    const [sort, setSort] = useState("min");

    const filter = FILTERS.find((key) => searchParams.get(key));
    const value = filter ? searchParams.get(filter) : null;

    useEffect(() => {
        if (!filter) {
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        setVisible(PAGE_SIZE);
        axios
            .get(`${API_BASE_URL}/api/v1/player`, { params: { [filter]: value } })
            .then((response) => setPlayers(response.data))
            .catch(() => setError("Couldn't load players. Is the backend running?"))
            .finally(() => setLoading(false));
    }, [filter, value]);

    const sorted = [...players].sort(SORTS[sort].compare);

    return (
        <div className="team-data-page">
            <h1 className="page-title">
                <AnimatedLetters
                    letterClass="text-animate"
                    strArray={pageTitle(filter, value).split("")}
                    idx={15}
                />
            </h1>

            {loading && <p className="status">Loading players…</p>}
            {error && <p className="status error">{error}</p>}
            {!loading && !error && !filter && (
                <p className="status">Pick a team, nation or position to see players.</p>
            )}
            {!loading && !error && filter && players.length === 0 && (
                <p className="status">No players found.</p>
            )}

            {!loading && !error && players.length > 0 && (
                <>
                    <div className="toolbar">
                        <span>{players.length} players</span>
                        <label>
                            Sort by
                            <select value={sort} onChange={(e) => setSort(e.target.value)}>
                                {Object.entries(SORTS).map(([key, { label }]) => (
                                    <option key={key} value={key}>{label}</option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <motion.div
                        className="player-container"
                        variants={cardContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {sorted.slice(0, visible).map((player) => (
                            <PlayerCard key={player.id} player={player} />
                        ))}
                    </motion.div>

                    {sorted.length > visible && (
                        <motion.button
                            className="load-more"
                            onClick={() => setVisible((n) => n + PAGE_SIZE)}
                            variants={fadeInVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Show more ({sorted.length - visible} left)
                        </motion.button>
                    )}
                </>
            )}
        </div>
    );
};

export default TeamData;
