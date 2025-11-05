import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../services/api";
import { motion } from "framer-motion";
import { ArrowLeft, Save, X } from "lucide-react";

export default function NoteEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchNote = async () => {
    if (id) {
      try {
        const { data } = await api.get(`/notes/${id}`);
        setTitle(data.title);
        setContent(data.content);
      } catch {
        toast.error("Failed to load note");
      }
    }
  };

  useEffect(() => {
    fetchNote();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return toast.error("Content is required!");

    try {
      if (id) {
        await api.put(`/notes/${id}`, { title, content });
        toast.success("Note updated!");
      } else {
        await api.post("/notes", { title, content });
        toast.success("Note created!");
      }
      navigate("/note");
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-main min-h-[80dvh] py-20 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full bg-white border border-zinc-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8"
      >
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute cursor-pointer -top-10 left-0 flex items-center gap-1 text-sm text-indigo-600 hover:underline"
        >
          <ArrowLeft size={16} /> Back
        </button>

        {/* Header */}
        <h2 className="text-3xl font-bold text-zinc-800 mb-6">
          {id ? "Edit Note" : "Create New Note"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title Input */}
          <div>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title..."
              className="w-full border border-zinc-300 focus:border-indigo-500 outline-none rounded-xl px-4 py-3 text-lg font-medium text-zinc-700 placeholder:text-zinc-400 transition-all"
            />
          </div>

          {/* Content Input */}
          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your thoughts, ideas or to-dos..."
              rows={12}
              className="w-full border border-zinc-300 focus:border-indigo-500 outline-none rounded-xl px-4 py-3 text-base leading-relaxed text-zinc-700 placeholder:text-zinc-400 transition-all resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end pt-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 px-5 py-2.5 border border-zinc-300 text-zinc-700 hover:bg-zinc-100 rounded-lg transition-all"
            >
              <X size={16} /> Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg shadow-sm transition-all"
            >
              <Save size={16} /> Save
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
