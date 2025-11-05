import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Edit3, Trash2, FileText } from "lucide-react";

export default function NoteCard({ note, onDelete }) {
  const navigate = useNavigate();

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className="group relative border border-zinc-200 bg-white rounded-2xl p-5 shadow-md hover:shadow-xl cursor-pointer overflow-hidden"
    >
      {/* subtle indigo glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl" />

      {/* Content */}
      <div onClick={() => navigate(`/note/${note._id}`)} className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-zinc-800 group-hover:text-indigo-700 transition">
            {note.title || "Untitled Note"}
          </h3>
          <p className="text-xs text-zinc-500">
            {new Date(note.createdAt).toLocaleDateString()}
          </p>
        </div>

        <p className="text-sm text-zinc-600 line-clamp-4 mt-2">
          {note.content || "No content available."}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 flex gap-3 mt-4 justify-end">
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/edit/${note._id}`);
          }}
          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg border border-indigo-100 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all"
        >
          <Edit3 size={16} />
          Edit
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(note._id);
          }}
          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg border border-red-100 bg-red-50 text-red-600 hover:bg-red-100 transition-all"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>

      {/* Decorative Icon */}
      <FileText
        size={52}
        className="absolute -top-5 -right-5 text-indigo-100 group-hover:text-indigo-200 transition-all duration-500"
      />
    </motion.div>
  );
}
