import LogoPL from "../../assets/images/PL.webp"
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";


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

            </nav>
        </div>
    )
}

export default Sidebar;