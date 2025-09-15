import logoPL from '../../assets/images/PL.webp';
import { useEffect, useState } from 'react';
import AnimatedLetters from '../AnimatedLetters/Animletters.jsx';
import Loader from 'react-loaders';
import './index.scss';
const Home = () => {
    const [letterClass, setLetterClass] = useState('text-animate');
    const welcArray = "Welcome to".split("");
    const premArray = "Premier Team Fantasy!".split("");

    useEffect(() => {
        const timerId = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 4000);
        return () => {
            clearTimeout(timerId);
        };
    }, []);

    return (
        <>
            <div className = 'home-page'>
                <div className="text-area">
                    <h1>
                    <img src={logoPL} alt="Logo" />
                    <br />
                    <AnimatedLetters letterClass={letterClass} strArray={welcArray} idx={12} className="animated-letters" />
                    <br /> 
                    <AnimatedLetters letterClass={letterClass} strArray={premArray} idx={15} className="animated-letters" />
                    </h1>
                    <h2>Your Home for Everything Premier League Related!</h2>
                    
                </div>
            </div>
            <Loader type="pacman" />
        </>

    );
};
 
export default Home;
