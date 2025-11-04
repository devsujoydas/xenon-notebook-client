import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";

const AuthProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    if (user) return <Navigate to="/" replace />
    if (!user) {
        return children;
    }

};

export default AuthProtectedRoute;
