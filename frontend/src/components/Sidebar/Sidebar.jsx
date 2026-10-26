import LogoPL from "../../assets/images/PL.webp"
import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUsers, faFlag, faSearch, faTshirt } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import "./index.scss";
import { logoVariants } from "../../animations/elementAnimations";

const LINKS = [
    { to: "/", label: "Home", icon: faHome },
    { to: "/teams", label: "Teams", icon: faUsers },
    { to: "/nations", label: "Nations", icon: faFlag },
    { to: "/positions", label: "Positions", icon: faTshirt },
    { to: "/search", label: "Search", icon: faSearch },
];

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { pathname } = useLocation();

    // Close the mobile menu whenever the page changes.
    useEffect(() => setIsOpen(false), [pathname]);

    return (
        <header className="nav-bar">
            <Link className="logo" to="/" aria-label="Home">
                <motion.img src={LogoPL} alt="Premier League" variants={logoVariants} whileHover="hover" />
            </Link>

            <nav id="main-nav" aria-label="Main" className={isOpen ? "open" : ""}>
                {LINKS.map(({ to, label, icon }) => (
                    <NavLink key={to} to={to} end={to === "/"}>
                        <FontAwesomeIcon icon={icon} />
                        <span>{label}</span>
                    </NavLink>
                ))}
            </nav>

            <button
                type="button"
                className={`hamburger-icon${isOpen ? " active" : ""}`}
                aria-label="Menu"
                aria-expanded={isOpen}
                aria-controls="main-nav"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
        </header>
    )
}

export default Sidebar;
