import { motion } from 'framer-motion';
import './index.scss';

const AnimatedLetters = ({ strArray, idx }) => {
    return (
        <span>
            {strArray.map((char, i) => (
                <motion.span 
                    key={char + i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                        duration: 0.5,
                        delay: (i + idx) * 0.1 
                    }}
                    whileHover={{ 
                        color: "#ffd700",
                        scale: 1.2,
                        transition: { duration: 0.2 } 
                    }}
                    className="animated-letter"
                >
                    {char}
                </motion.span>
            ))}
        </span>
    );
};

export default AnimatedLetters;

