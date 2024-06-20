import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/auth/index';
import { getAuth, updateProfile } from "firebase/auth";

export default function Settings() {
    const [currentUser, setCurrentUser] = useState();
    const [displayName, setDisplayName] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef();

    const { currentUser: authUser } = useAuth();
    
    useEffect(() => {
        setCurrentUser(authUser);
    }, [authUser]);

    useEffect(() => {
        if (isEditing) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleUpdateProfile = () => {
        const auth = getAuth();
        updateProfile(auth.currentUser, {
            displayName: displayName,
        }).then(() => {
            console.log('Profile updated!');
            setCurrentUser(auth.currentUser);
            setIsEditing(false);
        }).catch((error) => {
            console.error(error);
        });
    }

    const handleCancel = () => {
        setIsEditing(false);
        setDisplayName('');
    }

return (
    <>
        <div className='flex justify-center items-center h-screen overflow-hidden w-full'>
            <div className='flex flex-col p-4 mx-auto rounded-lg bg-slate-100/30 dark:bg-slate-700/40 backdrop-blur-sm shadow-md h-4/5 w-5/6'>
                <h1 className='text-center text-gray-700 dark:text-white font-bold py-2 px-3 antialiased font-sans'>Settings</h1>
                <div className='h-4/5 w-4/5 p-4'>
                    {isEditing ? (
                        <>
                            <input ref={inputRef} type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder={currentUser.displayName} className='bg-transparent dark:placeholder:text-slate-200 focus:outline-none text-2xl dark:placeholder-white antialiased font-sans text-slate-600 font-bold dark:text-white placeholder-slate-700 placeholder:text-black' />
                            <div className='flex justify-start'>
                                <button onClick={handleUpdateProfile} className='mr-2 rounded-xl bg-blue-500 text-white py-1 px-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 antialiased font-sans'>Confirmar</button>
                                <button onClick={handleCancel} className='rounded-xl bg-blue-500 text-white py-1 px-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 antialiased font-sans'>Cancelar</button>
                            </div>
                        </>
                    ) : (
                        <p onClick={() => setIsEditing(true)} className='text-slate-600 text-2xl dark:text-slate-200 antialiased font-sans font-bold'>Nome: {currentUser ? (currentUser.displayName ? currentUser.displayName : currentUser.email) : ''}</p>
                    )}
                </div>
            </div>
        </div>
    </>
);
}