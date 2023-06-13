import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../Firbase/Firbase.config";
import axios from "axios";

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

            // get and set token
            if(currentUser){
                axios.post('https://kids-club-server-production.up.railway.app/jwt', {email: currentUser.email})
                .then(data =>{
                    console.log(data.data.token)
                    localStorage.setItem('access-token', data?.data?.token)
                    //  localStorage.setItem('role', 'student/admin/instructor')
                    localStorage.setItem('userInfo', JSON.stringify(data?.data?.userInfo))
                    setLoading(false);
                })
            }
            else{
                localStorage.removeItem('access-token')
                localStorage.removeItem('userInfo')
            }

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