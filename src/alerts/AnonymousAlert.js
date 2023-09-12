import Alert from "./Alert"
import { useAuth } from "../contexts/AuthContext"

function AnonymousAlert() {
    const { googleLogin } = useAuth()

    return (
        <Alert>
            This is a guest account. Your smiles will be lost!
        </Alert>
    )
}

export default AnonymousAlert