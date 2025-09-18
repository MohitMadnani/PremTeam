import Loader from 'react-loaders'
import { useState,useEffect } from 'react'
import AnimatedLetters from "../AnimatedLetters/Animletters"

const Search = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const [query, setQuery] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 3000)

        return () => clearTimeout(timer)

    }, [])

    const handleInputChange = (e) => {
        setQuery(e.target.value)
    }

    const handleButtonClick = () => {
        window.location.href = `/data?name=${encodeURIComponent(query)}`
    }

    return (
        <>
            <div className="search-container">
                <h1 className ="page-title">
                    <br/>
                    <br/>
                    <AnimatedLetters letterClass={letterClass} strArray={"Search".split("")} idx={15} />

                </h1>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={query}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleButtonClick}>Search</button>
                </div>
            </div>
            <Loader type="pacman" />
        </>
    )
}

export default Search