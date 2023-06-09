import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../Firebase/firebase.config';


const auth  = getAuth(app)

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [user, setUser]= useState(null)
    const [loading, setloading] = useState(true)

    const createUser =(email, password)=>{
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn =(email, password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut=()=>{
        return signOut(auth)
    }
//observe auth change
    useEffect(()=>{
       const unsubscribe= onAuthStateChanged(auth, currentUser =>{
            console.log('auth state change', currentUser)
            setUser(currentUser)
            setloading(false)
        })
        return ()=>{
            unsubscribe();
        }
    },[])

    const authInfo ={
        user,
        createUser,
        loading,
        signIn,
        logOut,
    }
    return (
        <AuthContext.Provider value={authInfo}>
          {children}  
        </AuthContext.Provider>
    );
};

export default AuthProvider;