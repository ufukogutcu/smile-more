import { useAuth } from "../contexts/AuthContext";

function AuthenticationPage() {
    const { guestLogin, googleLogin } = useAuth()
    
    return (
        <div>
            AuthPage
            <br></br>
            <button onClick={guestLogin}>Login as Anonymous</button>
            <button onClick={googleLogin}>Login with Google</button>
        </div>
    )
}

export default AuthenticationPage