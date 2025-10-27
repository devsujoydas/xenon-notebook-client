import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

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
    return <div className="text-center py-20 bg-white rounded shadow">Loading...</div>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-semibold">{note.title}</h2>
          <p className="text-sm text-gray-500">
            {new Date(note.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/edit/${note._id}`)}
            className="px-3 py-1 rounded border border-zinc-300 hover:bg-gray-50 cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1 rounded border border-zinc-300 text-red-600 hover:bg-red-50 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="mt-6 whitespace-pre-wrap">{note.content}</div>
    </div>
  );
}
