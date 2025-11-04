import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../services/api";

export default function NoteEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchNote = async () => {
    if (id) {
      const { data } = await api.get(`/notes/${id}`);
      setTitle(data.title);
      setContent(data.content);
    }
  };

  useEffect(() => {
    fetchNote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return toast.error("Content is required!");

    if (id) {
      await api.put(`/notes/${id}`, { title, content });
      toast.success("Note updated!");
    } else {
      await api.post("/notes", { title, content });
      toast.success("Note created!");
    }
    navigate("/");
  };

  return (
    <div className="w-main min-h-[79dvh] py-6 ">
      <div className="p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">
          {id ? "Edit Note" : "New Note"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full border border-zinc-200 outline-none rounded px-3 py-2"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note..."
            rows={10}
            className="w-full border border-zinc-200 outline-none rounded px-3 py-2"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded cursor-pointer"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border border-zinc-300 hover:bg-zinc-100 rounded cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
