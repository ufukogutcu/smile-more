import React, { useState, useEffect, useContext } from "react"
import {auth} from "../firebase"

export function useAuth() {
    return useContext(AuthContext)
}

const AuthContext = React.createContext()

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState({uid:0})

    function login() {
        return auth.signInAnonymously()
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}