import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../AuthProvider/AuthProvider'

const CTASections = () => {
    const { user } = useAuth()
    return (
        <section className="py-20 md:py-32 bg-indigo-600 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to secure your notes?
            </h2>
            <p className="text-lg md:text-xl mb-8">
                Start your personal notebook journey with Xenon Notebook.
            </p>
            <Link
                to={`${user ? "/note" : "/signup"}`}
                className="bg-white text-indigo-600 px-8 py-4 rounded-md font-semibold shadow-md hover:bg-gray-100 transition"
            >
                Get Started Free
            </Link>
        </section>
    )
}

export default CTASections