import { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged,signOut } from 'firebase/auth';
import firebase from '../utils/firebase';
import {doc, getDoc, getFirestore} from "firebase/firestore";

const AuthContext = createContext({
    user: null,
    }
)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userType, setUserType] = useState(null);
    const [loading, setLoading] = useState(true);

    const auth = getAuth(firebase);
    const db = getFirestore(firebase);

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.log('Error signing out:', error);
        }
    };

    useEffect(() => {
        const auth = getAuth(firebase);
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user && !user.emailVerified) {
                user = null;
            }
            setUser(user);
            if (user) {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                setUserType(userDoc.data().userType);
            } else {
                setUserType(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, userType, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };