import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/auth/index';
import { doSignOut } from '../../../contexts/auth/auth';

const Logout = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();

    return (
        <nav>
            {
                userLoggedIn
                    ? (
                        <button
                            onClick={() => { doSignOut().then(() => { navigate('/login'); }); }}
                            className='text-sm text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition duration-300'
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                className='text-sm text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition duration-300'
                                to='/login'
                            >
                                Login
                            </Link>
                            <Link
                                className='text-sm text-white bg-green-600 px-3 py-1 rounded hover:bg-green-700 transition duration-300'
                                to='/register'
                            >
                                Register New Account
                            </Link>
                        </>
                    )
            }
        </nav>
    );
};

export default Logout;
