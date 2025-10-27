import { useNavigate } from "react-router-dom";

export default function NoteCard({ note, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="border border-zinc-200 rounded-lg p-4 shadow-sm hover:shadow-md transition bg-white cursor-pointer flex flex-col justify-between">
      <div onClick={() => navigate(`/note/${note._id}`)}>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{note.title}</h3>
          <p className="text-sm text-gray-500">
            {new Date(note.createdAt).toLocaleString()}
          </p>
        </div>
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">{note.content}</p>
      </div>
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => navigate(`/edit/${note._id}`)}
          className="px-3 py-1 rounded border border-zinc-300 hover:bg-gray-50 cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note._id)}
          className="px-3 py-1 rounded border border-zinc-300 text-red-600 hover:bg-red-50 cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
