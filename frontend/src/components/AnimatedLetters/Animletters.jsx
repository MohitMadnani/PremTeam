import { motion } from 'framer-motion';
import './index.scss';
import { letterVariants } from '../../animations/textAnimations';

const AnimatedLetters = ({ strArray, idx }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    return (
        <motion.span
            className="text-animate"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {strArray.map((char, i) => (
                <motion.span
                    key={char + i}
                    className={`text-animate-item`}
                    variants={letterVariants}
                    whileHover="hover"
                    custom={i + idx}
                >
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
};

export default AnimatedLetters;

