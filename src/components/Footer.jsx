import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PenTool, NotebookText, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-black text-white overflow-hidden">

      {/* Main footer content */}
      <div className="w-main">
        <div className="relative z-10    py-16 flex flex-col md:flex-row justify-between gap-10 border-t border-white/10">
          {/* Left section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <NotebookText className="w-7 h-7 text-yellow-400" />
              <h2 className="text-2xl font-bold tracking-tight">Xenon Notebook</h2>
            </div>
            <p className="text-sm text-gray-200 max-w-sm">
              Your private digital notebook for capturing thoughts, plans, and inspirations —
              anytime, anywhere. Stay organized and stay inspired.
            </p>
          </div>

          {/* Middle section - Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-yellow-300">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>
                <Link to="/" className="hover:text-yellow-300 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/new" className="hover:text-yellow-300 transition-colors">New Note</Link>
              </li>
              <li>
                <Link to="/signin" className="hover:text-yellow-300 transition-colors">Sign In</Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-yellow-300 transition-colors">Sign Up</Link>
              </li>
            </ul>
          </div>

          {/* Right section - Stay connected */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-yellow-300">Connect</h3>
            <div className="flex items-center gap-4">
              <motion.a
                href="https://github.com"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>

            <p className="mt-4 text-sm text-gray-300 flex items-center gap-2">
              <PenTool className="w-4 h-4" /> Built for creators & thinkers
            </p>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="relative z-10 border-t border-white/10 text-center text-gray-300 py-5 text-sm w-main flex justify-between items-center ">
        <h1>
          © {new Date().getFullYear()} Xenon Notebook — All rights reserved.
        </h1>
        <h1>
          Your private digital notebook. Built with ❤️ by Sujoy.
        </h1>

      </div>
    </footer>
  );
}
