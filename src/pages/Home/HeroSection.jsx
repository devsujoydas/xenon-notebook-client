import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-600 text-white min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Main Content */}
      <div className="relative z-10 w-main mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight mb-6"
        >
          Organize Your Thoughts with <br />
          <span className="text-yellow-400 drop-shadow-lg">Xenon Notebook</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-base md:text-lg max-w-2xl mb-8 text-gray-100"
        >
          Capture, organize, and revisit your ideas anytime, anywhere.
          Xenon Notebook is your perfect digital companion to turn thoughts into action.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            to="/signup"
            className="px-8 py-4 bg-yellow-400 text-indigo-700 font-semibold rounded-xl shadow-lg hover:bg-yellow-300 transform hover:scale-105 transition-all"
          >
            Get Started
          </Link>
          <Link
            to="/signin"
            className="px-8 py-4 border border-white/40 rounded-xl hover:bg-white/20 transition-all"
          >
            Sign In
          </Link>
        </motion.div>

        {/* Feature badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12 flex flex-wrap justify-center gap-6"
        >
          <span className="bg-white/20 px-4 py-2 rounded-full text-sm md:text-base">✨ Easy-to-use</span>
          <span className="bg-white/20 px-4 py-2 rounded-full text-sm md:text-base">📝 Organize Notes</span>
          <span className="bg-white/20 px-4 py-2 rounded-full text-sm md:text-base">🔒 Secure & Private</span>
          <span className="bg-white/20 px-4 py-2 rounded-full text-sm md:text-base">☁️ Cloud Sync</span>
        </motion.div>
      </div>

      {/* Decorative floating circles */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
        className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-300/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 7 }}
        className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-400/20 rounded-full blur-2xl"
      />

      {/* Scroll Down Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-10 w-full flex justify-center items-center"
      >
        <a href="#features" className="animate-bounce text-white/80 flex flex-col items-center">
          <ChevronDown size={32} />
          <span className="text-sm mt-1">Explore Features</span>
        </a>
      </motion.div>
    </section>
  );
}
