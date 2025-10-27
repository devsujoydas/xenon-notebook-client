import { Link } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Header() {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="bg-indigo-600 text-white py-6">
            <div className="w-main flex justify-between items-center">
                <Link to="/" className="md:text-2xl text-xl font-semibold">
                    Xenon Notebook
                </Link>


                <nav className="space-x-3 hidden md:flex items-center text-sm md:text-[16px]">
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
                                className="px-3 py-2 rounded bg-red-500 hover:bg-red-600 cursor-pointer transition-all"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </nav>

                <div className="relative block  md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        <Menu />
                    </button>



                    <div onClick={() => setIsOpen(!isOpen)} className={`absolute top-8 ${isOpen ? " opacity-100 z-50" : "opacity-0 -z-50 "} right-0 transition-all duration-500 shadow-md border border-zinc-200 rounded-md  bg-white p-2 `}>
                        <nav className="space-x-3  flex flex-col items-center text-sm md:text-[16px] text-center text-black">
                            {!user ? (
                                <>
                                    <Link to="/signin"
                                        className="px-3 py-2 rounded hover:bg-indigo-500 transition-all"
                                    >
                                        SignIn
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="px-3 py-2 rounded hover:bg-indigo-500 transition-all"
                                    >
                                        SignUp
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/"
                                        className="px-3 py-2 rounded active:bg-indigo-500 transition-all"
                                    >
                                        All Notes
                                    </Link>
                                    <Link
                                        to="/new"
                                        className="px-3 py-2 rounded  text-indigo-600 font-medium transition-all"
                                    >
                                        New Note
                                    </Link>
                                    <button
                                        onClick={() => logout()}
                                        className="px-8 py-2 text-white rounded bg-red-500 hover:bg-red-600 cursor-pointer transition-all"
                                    >
                                        Logout
                                    </button>
                                </>
                            )}
                        </nav>
                    </div>
                </div>

            </div>
        </header>
    );
}
