export const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.5
    }
  })
};

export const logoVariants = {
  hidden: { opacity: 0, rotate: -200 },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: {
      delay: 1.4,
      duration: 1,
      type: "spring"
    }
  },
  hover: {
    scale: 1.1,
    transition: { duration: 0.3 }
  }
};

export const buttonVariants = {
  hover: {
    backgroundColor: "#ffd700",
    color: "#000000",
    scale: 1.05,
    transition: { duration: 0.3 }
  }
};