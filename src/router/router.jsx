import { Routes, Route } from "react-router-dom";
import NoteView from "../pages/Note/NoteView";
import NoteEditor from "../pages/Note/NoteEditor";
import NoteList from "../pages/Note/NoteList";
import SignUp from "../pages/Auth/SignUp";
import SignIn from "../pages/Auth/SignIn";
import ProtectedRoute from "./ProtectedRoute";

export default function Router() {
    return (
        <Routes> 
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
 
            <Route
                path="/"
                element={<ProtectedRoute><NoteList /></ProtectedRoute>}
            />
            <Route
                path="/new"
                element={<ProtectedRoute><NoteEditor /></ProtectedRoute>}
            />
            <Route
                path="/edit/:id"
                element={<ProtectedRoute><NoteEditor /></ProtectedRoute>}
            />
            <Route
                path="/note/:id"
                element={<ProtectedRoute><NoteView /></ProtectedRoute>}
            />
        </Routes>
    );
}
