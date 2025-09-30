import { useState, useEffect } from "react";
import Loader from "react-loaders";
import { motion } from "framer-motion";
import AnimatedLetters from "../AnimatedLetters/Animletters";
import { fadeInVariants } from "../../animations/elementAnimations";
import { buttonVariants } from "../../animations/elementAnimations";

const Search = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 3000)

        return () => clearTimeout(timer)

    }, [])

    const handleSearchChange = event => {
        setSearchQuery(event.target.value)
    }

    const handleGoButtonClick = () => {
        window.location.href = `/data?name=${encodeURIComponent(searchQuery)}`
    }

    return (
        <>
            <div className="container teams-page">
                <h1 className ="page-title">
                    <br/>
                    <br/>
                    <AnimatedLetters letterClass={letterClass} strArray={"Search".split("")} idx={15} />
                </h1>
                <motion.div 
                    className="search-bar"
                    variants={fadeInVariants}
                    initial="hidden"
                    animate="visible"
                    custom={0.5}
                >
                    <input
                        type="text"
                        placeholder="Search for players"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <motion.button 
                        onClick={handleGoButtonClick}
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap={{ scale: 0.95 }}
                    >
                        Go
                    </motion.button>
                </motion.div>
            </div>
            <Loader type="pacman" />
        </>
    )
}

export default Search