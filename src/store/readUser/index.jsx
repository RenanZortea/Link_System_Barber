import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const readUser = async() => {
    return new Promise((resolve, reject) => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
        if (user) {
            resolve(user);
        } else {
            reject('No user signed in');
        }
        });
    });
    }