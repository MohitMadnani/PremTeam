import LogoPL from "../../assets/images/PL.webp"
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUsers, faFlag, faSearch, faTshirt } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import "./index.scss";
import { logoVariants } from "../../animations/elementAnimations";

const Sidebar = () => {
    const [isActive, setIsActive] = useState(false);
    
    const iconTextVariants = {
        hidden: { opacity: 0, y: 10 },
        hover: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.2 }
        }
    };

    return (
        <div className="nav-bar">
            <Link className="logo" to="/">
                <motion.img 
                    src={LogoPL} 
                    alt="Logo"
                    variants={logoVariants}
                    whileHover="hover"
                />
            </Link>
            
            <nav className={isActive ? "mobile-show" : ""}>
                <NavLink exact="true" activeclassname="active" to="/" onClick={() => setIsActive(false)}>
                    <motion.div className="nav-item">
                        <FontAwesomeIcon icon={faHome} />
                        <motion.span
                            className="icon-text"
                            variants={iconTextVariants}
                            initial="hidden"
                            whileHover="hover"
                        >
                            HOME
                        </motion.span>
                    </motion.div>
                </NavLink>
                
                <NavLink exact="true" activeclassname="active" to="/teams" onClick={() => setIsActive(false)}>
                    <motion.div className="nav-item">
                        <FontAwesomeIcon icon={faUsers} />
                        <motion.span
                            className="icon-text"
                            variants={iconTextVariants}
                            initial="hidden"
                            whileHover="hover"
                        >
                            TEAMS
                        </motion.span>
                    </motion.div>
                </NavLink>
                
                <NavLink exact="true" activeclassname="active" to="/nations" onClick={() => setIsActive(false)}>
                    <motion.div className="nav-item">
                        <FontAwesomeIcon icon={faFlag} />
                        <motion.span
                            className="icon-text"
                            variants={iconTextVariants}
                            initial="hidden"
                            whileHover="hover"
                        >
                            NATIONS
                        </motion.span>
                    </motion.div>
                </NavLink>


                <NavLink exact="true" activeclassname="active" to="/positions" onClick={() => setIsActive(false)}>
                    <motion.div className="nav-item">
                        <FontAwesomeIcon icon={faTshirt} />
                        <motion.span
                            className="icon-text"
                            variants={iconTextVariants}
                            initial="hidden"
                            whileHover="hover"
                        >
                            POSITION
                        </motion.span>
                    </motion.div>
                </NavLink>

                <NavLink exact="true" activeclassname="active" to="/search" onClick={() => setIsActive(false)}>
                    <motion.div className="nav-item">
                        <FontAwesomeIcon icon={faSearch} />
                        <motion.span
                            className="icon-text"
                            variants={iconTextVariants}
                            initial="hidden"
                            whileHover="hover"
                        >
                            SEARCH
                        </motion.span>
                    </motion.div>
                </NavLink>
            </nav>
            
            <div 
                className="hamburger-icon"
                onClick={() => setIsActive(!isActive)}
            >
                <span className={isActive ? "active" : ""}></span>
                <span className={isActive ? "active" : ""}></span>
                <span className={isActive ? "active" : ""}></span>
            </div>
        </div>
    )
}

export default Sidebar;