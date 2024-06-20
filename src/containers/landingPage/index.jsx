import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div>
            <header className="flex justify-end p-4 bg-blue-900">
                <Link to="/login">
                    <button className="bg-white hover:bg-blue-700 text-blue-500 hover:text-white font-bold py-2 px-4 rounded">
                        Login
                    </button>
                </Link>
            </header>
            
        </div>
    );
};

export default LandingPage;