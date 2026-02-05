import { motion, type Variants } from "framer-motion";
import SubHeading from "@/components/ui/subHeading";
import Navbar from "../components/ui/navbar";
import H1 from "@/components/ui/mainHeading";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo-ish
    },
  },
};

const Hero = () => {
  return (
    <div className="relative bg-neutral-900 text-white w-screen h-screen overflow-hidden">
      <Navbar></Navbar>

      {/* UNIQUE BACKGROUND */}
      <div className="absolute inset-0 -z-0 overflow-hidden pointer-events-none">
        <GlowBackground />
      </div>

      <main className="relative z-10 flex h-[80vh] flex-col items-center justify-center px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-8 lg:gap-10 text-center max-w-4xl"
        >
          <motion.div variants={itemVariants}>
            <H1 heading="Organize Smarter, Work Faster" />
          </motion.div>

          <motion.div variants={itemVariants}>
            <SubHeading />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-row gap-5 mt-4"
          >
            <Link to="/signUp">
              <Button size="lg" className="min-w-30">
                Get Started
              </Button>
            </Link>

            <Link to="/login">
              <Button
                size="lg"
                variant="outline"
                className="min-w-30 border border-neutral-700 bg-transparent text-white"
              >
                Login
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Hero;

/* ---------------------------------- */
/* Glow Background Component */
/* ---------------------------------- */

const GlowBackground = () => {
  return (
    <>
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl opacity-30"
          style={{
            width: `${300 + i * 40}px`,
            height: `${300 + i * 40}px`,
            background:
              "radial-gradient(circle, rgba(255,255,255,0.25), transparent 70%)",
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 80}%`,
          }}
          animate={{
            x: [0, 40, -40, 0],
            y: [0, -30, 30, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Subtle Noise Overlay */}
      <div className="absolute inset-0 noise-overlay" />
    </>
  );
};
