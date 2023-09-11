import { useAuth } from "../contexts/AuthContext";

function AuthenticationPage() {
    const { currentUser, login } = useAuth()
    
    return (
        <div>
            AuthPage
            <br></br>
            <button onClick={login}>Login</button>
        </div>
    )
}

export default AuthenticationPage