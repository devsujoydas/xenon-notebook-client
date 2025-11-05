import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { NotebookText, PenTool, Github, Facebook, Youtube, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white overflow-hidden border-t border-white/10">
      {/* Main Content */}
      <div className="w-main mx-auto py-16 flex flex-col md:flex-row justify-between gap-10 relative z-10">
        {/* Left Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <NotebookText className="w-8 h-8 text-yellow-400 drop-shadow" />
            <h2 className="text-2xl font-bold tracking-tight">Xenon Notebook</h2>
          </div>
          <p className="text-sm text-gray-300 max-w-sm leading-relaxed">
            Your secure digital space to store ideas, notes, and inspiration —
            anytime, anywhere. Built for thinkers, dreamers, and creators.
          </p>
        </div>

        {/* Middle Section */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-yellow-400">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/" className="hover:text-yellow-400 transition">Home</Link></li>
            <li><Link to="/new" className="hover:text-yellow-400 transition">Create Note</Link></li>
            <li><Link to="/signin" className="hover:text-yellow-400 transition">Sign In</Link></li>
            <li><Link to="/signup" className="hover:text-yellow-400 transition">Sign Up</Link></li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-yellow-400">Connect</h3>
          <div className="flex items-center gap-4">
            {/* GitHub */}
            <motion.a
              href="https://github.com/devsujoydas"
              target="_blank"
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
            >
              <Github className="w-5 h-5" />
            </motion.a>

            {/* Facebook */}
            <motion.a
              href="https://facebook.com/devsujoydas"
              target="_blank"
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
            >
              <Facebook className="w-5 h-5" />
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              href="https://wa.me/8801XXXXXXXXX"
              target="_blank"
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
            </motion.a>

            {/* YouTube */}
            <motion.a
              href="https://youtube.com/@devsujoydas"
              target="_blank"
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
            >
              <Youtube className="w-5 h-5" />
            </motion.a>
          </div>

          <p className="mt-4 text-sm text-gray-400 flex items-center gap-2">
            <PenTool className="w-4 h-4" /> Built with passion for note-takers
          </p>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="border-t border-white/10 py-5 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center w-main mx-auto">
        <p>© {new Date().getFullYear()} Xenon Notebook — All rights reserved.</p>
        <p>Made with ❤️ by <span className="text-yellow-400">Sujoy Das</span></p>
      </div>

      {/* Glow Background Elements */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-20 w-56 h-56 bg-purple-600/10 rounded-full blur-3xl" />
    </footer>
  );
}
