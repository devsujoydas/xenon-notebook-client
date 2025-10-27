import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Swal from "sweetalert2";
import api from "../../services/api";
import NoteCard from "../../components/NoteCard";

export default function NoteList() {
  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState("");

  const getNotes = async () => {
    try {
      const { data } = await api.get("/notes");
      setNotes(data);
    } catch {
      toast.error("Failed to load notes");
    }
  };

  const handleDelete = async (id) => {
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
        toast.success("Note deleted successfully");
        getNotes();
      } catch {
        toast.error("Failed to delete note");
      }
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  const filtered = notes.filter((n) =>
    (n.title + n.content).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="">
      <Toaster />
      <div className="flex justify-between items-center mb-6 ">
        <h2 className="text-2xl font-semibold">All Notes</h2>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search notes..."
          className="border border-zinc-300 rounded-full outline-none px-4 py-2"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded shadow">
          No notes yet — create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((note) => (
            <NoteCard key={note._id} note={note} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
