import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { ArrowLeft, Edit3, Trash2 } from "lucide-react";

export default function NoteView() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const navigate = useNavigate();

  const fetchNote = async () => {
    try {
      const { data } = await api.get(`/notes/${id}`);
      setNote(data);
    } catch {
      toast.error("Failed to load note");
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This note will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: "#fff",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/notes/${id}`);
        navigate("/");
        toast.success("Note deleted successfully");
      } catch {
        toast.error("Failed to delete note");
      }
    }
  };

  useEffect(() => {
    fetchNote();
  }, [id]);

  if (!note)
    return (
      <div className="text-center py-32 text-gray-500 font-medium">
        Loading your note...
      </div>
    );

  return (
    <div className="w-main py-20 min-h-[70dvh] flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="relative w-full  bg-white border border-zinc-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8"
      >
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute cursor-pointer -top-10 left-0 flex items-center gap-1 text-sm text-indigo-600 hover:underline"
        >
          <ArrowLeft size={16} /> Back to Notes
        </button>

        {/* Header */}
        <div className="flex justify-between items-start border-b border-zinc-100 pb-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold text-zinc-800 mb-1">
              {note.title || "Untitled Note"}
            </h2>
            <p className="text-sm text-gray-500">
              {new Date(note.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/edit/${note._id}`)}
              className="flex items-center gap-1 px-4 py-1.5 text-sm font-medium border border-indigo-100 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-all"
            >
              <Edit3 size={16} /> Edit
            </button>

            <button
              onClick={handleDelete}
              className="flex items-center gap-1 px-4 py-1.5 text-sm font-medium border border-red-100 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-all"
            >
              <Trash2 size={16} /> Delete
            </button>
          </div>
        </div>

        {/* Note Content */}
        <div className="prose prose-zinc max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
          {note.content || "No content available."}
        </div>
      </motion.div>
    </div>
  );
}
