import { db, auth } from "../firebaseConfig";
import { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateCurrentUser } from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthentication] = useState(undefined);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            // console.log("got User", user);
            if (user) {
                setIsAuthentication(true);
                setUser(user);
                updateUserData(user.uid);
            } else {
                setIsAuthentication(false);
                setUser(null);
            }
        });
        return unsub;
    }, []);

    const updateUserData =async (userId)=>{

        const docRef = doc(db, 'users', userId);
        const docSnap =await getDoc (docRef);
        if(docSnap.exists()){
            let data = docSnap.data();
            setUser ({...user, username:data.username , profileUrl:data.profileUrl, userId: data.userId})
        }
    }

    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch (e) {
            let msg = e.message;
            if (msg.includes("(auth/invalid-email)")) msg = "Invalid email.";
            if (msg.includes("(auth/wrong-password)")) msg = "Incorrect password";
            if (msg.includes("auth/invalid-credential")) msg = "Invalid Credentails";
            if (msg.includes("(auth/user-not-found)")) msg = "No user found with this email.";
            if (msg.includes("(auth/network-request-failed)")) msg = "Network error. Please check your connection.";
            return { success: false, msg };
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            return { success: true };
        } catch (e) {
            return { success: false, msg: e.message, error: e };
        }
    };

    const register = async (username, profileUrl, email, password) => {
        try {
            // Check that username is defined
            // if (!username) {
            //     return { success: false, msg: "Username is required." };
            // }

            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log('response.user:', response?.user);

            // Ensure profileUrl is defined or use a default
            const userProfileUrl = profileUrl || ''; // Default to an empty string if undefined

            // Set user document in Firestore
            await setDoc(doc(db, "users", response.user.uid), {
                username,
                profileUrl: userProfileUrl,
                userId: response.user.uid,
            });
            return { success: true, data: response.user };
        } catch (e) {
            let msg = e.message;
            console.log(username, email, password, profileUrl)
            if (msg.includes("(auth/invalid-email)")) msg = "Invalid email.";
            if (msg.includes("(auth/email-already-in-use)")) msg = "Email already in use.";
            if (msg.includes("(auth/wrong-password)")) msg = "Incorrect password";
            if (msg.includes("auth/invalid-credential")) msg = "Invalid Credentails";
            if (msg.includes("(auth/user-not-found)")) msg = "No user found with this email.";
            if (msg.includes("(auth/network-request-failed)")) msg = "Network error. Please check your connection.";
            return { success: false, msg };
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const value = useContext(AuthContext);
    if (!value) {
        throw new Error("The useAuth hook must be used within an AuthContextProvider.");
    }
    return value;
};
