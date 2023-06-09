import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../Firbase/Firbase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

     // Create User
     const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Sign In
    const signIn = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // SignOut
    const logOut = () =>{
        setLoading(true);
        return signOut(auth);
    }

    //Observation user
    useEffect(() =>{
        const unsubscribe =  onAuthStateChanged(auth, currentUser =>{
             setUser(currentUser);
             console.log('Current User', currentUser
             );
             setLoading(false);
         });
         return () => {
             return unsubscribe();
         }
     },[]) 

    // Update User profile

     const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }


      // Google Login
  const googleProvider =  () => {
    return signInWithPopup(auth, provider);
  };


    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        updateUserProfile,
        googleProvider

    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;