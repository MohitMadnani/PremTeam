import LogoPL from "../../assets/images/PL.webp"
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import "./index.scss"


const Sidebar = () => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className="nav-bar">
            <Link className="logo" to="/">
                <img src={LogoPL} alt="Logo"/>
            </Link>
            <nav className = {isActive ? "mobile-show" : ""}>
                <NavLink exact="true" activeclassname="active" to="/" onClick={() => setIsActive(false)}>
                    <FontAwesomeIcon icon={faHome} onClick={() => setIsActive(false)} />
                </NavLink>
                <NavLink exact="true" activeclassname="active" to="/search" onClick={() => setIsActive(false)}>
                    <FontAwesomeIcon icon={faSearch} onClick={() => setIsActive(false)} />
                </NavLink>

            </nav>
        </div>
    )
}

export default Sidebar;