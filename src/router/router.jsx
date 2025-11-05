import { Routes, Route } from "react-router-dom";
import NoteView from "../pages/Note/NoteView";
import NoteEditor from "../pages/Note/NoteEditor";
import NoteList from "../pages/Note/NoteList";
import SignUp from "../pages/Auth/SignUp";
import SignIn from "../pages/Auth/SignIn";
import ProtectedRoute from "./ProtectedRoute";
import ResetPassword from "../pages/Auth/ResetPassword";
import Home from "../pages/Home/Home";
import AuthProtectedRoute from "./AuthProtectedRoute";
import Profile from "../pages/Profile/Profile";
 
export default function Router() {
    return (
        <Routes> 
            <Route path="/signin" element={<AuthProtectedRoute><SignIn /></AuthProtectedRoute>} />
            <Route path="/signup" element={<AuthProtectedRoute><SignUp /></AuthProtectedRoute>} />
            <Route path="/reset-password" element={<AuthProtectedRoute><ResetPassword /></AuthProtectedRoute>} />
          
            <Route
                path="/"
                element={<Home />}
            />
            <Route
                path="/profile" 
                element={<ProtectedRoute><Profile /></ProtectedRoute>}
            />
            <Route
                path="/note"
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
