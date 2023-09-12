import { useAuth } from "../contexts/AuthContext"

function Dashboard() {
    const { currentUser, logout } = useAuth()

    return (
        <>
            Dashboard:
            <br />
            {currentUser.uid}
            <button onClick={logout}>Sign Out</button>
        </>
    )
}

export default Dashboard