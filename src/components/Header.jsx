import { Link } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";

export default function Header() {
    const { user, logout } = useAuth();

    return (
        <header className="bg-indigo-600 text-white py-6">
            <div className="w-main flex justify-between items-center">
                <Link to="/" className="md:text-2xl text-xl font-semibold">
                    Xenon Notebook
                </Link>

                <h1 className="font-semibold text-xl">{user?.name}</h1>

                <nav className="space-x-3 flex items-center text-sm md:text-[16px]">
                    {!user ? (
                        <>
                            <Link to="/signin"
                                className="px-3 py-2 rounded hover:bg-indigo-500 transition-all"
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/signup"
                                className="px-3 py-2 rounded hover:bg-indigo-500 transition-all"
                            >
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/"
                                className="px-3 py-2 rounded hover:bg-indigo-500 transition-all"
                            >
                                All Notes
                            </Link>
                            <Link
                                to="/new"
                                className="px-3 py-2 rounded bg-white text-indigo-600 font-medium transition-all"
                            >
                                New Note
                            </Link>
                            <button
                                onClick={() => logout()}
                                className="px-3 py-2 rounded bg-red-500 hover:bg-red-600 transition-all"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}
