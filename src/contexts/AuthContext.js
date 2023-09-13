import React, { useState, useEffect, useContext } from "react"
import { auth, googleProvider, appleProvider } from "../firebase"

export function useAuth() {
    return useContext(AuthContext)
}

const AuthContext = React.createContext()

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState({})

    function guestLogin() {
        auth.signInAnonymously()
    }

    function googleLogin() {
        auth.signInWithPopup(googleProvider)
    }

    function appleLogin() {
        auth.signInWithPopup(appleProvider)
    }

    function logout() {
        auth.signOut()
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        guestLogin,
        googleLogin,
        appleLogin,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}