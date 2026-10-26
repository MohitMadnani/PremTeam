import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "react-loaders";
import { motion } from "framer-motion";
import AnimatedLetters from "../AnimatedLetters/Animletters";
import { fadeInVariants } from "../../animations/elementAnimations";
import { buttonVariants } from "../../animations/elementAnimations";

const Search = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 3000)

        return () => clearTimeout(timer)

    }, [])

    const handleSearchChange = event => {
        setSearchQuery(event.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault()
        const query = searchQuery.trim()
        if (query) navigate(`/teamdata?name=${encodeURIComponent(query)}`)
    }

    return (
        <>
            <div className="container teams-page">
                <h1 className ="page-title">
                    <br/>
                    <br/>
                    <AnimatedLetters letterClass={letterClass} strArray={"Search".split("")} idx={15} />
                </h1>
                <motion.form
                    onSubmit={handleSubmit}
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
                        type="submit"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap={{ scale: 0.95 }}
                    >
                        Go
                    </motion.button>
                </motion.form>
            </div>
            <Loader type="pacman" />
        </>
    )
}

export default Search