import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useSmiles } from "../contexts/SmilesContext"
import styles from "./Dashboard.module.css"

function Dashboard() {
    const { currentUser, logout } = useAuth()
    const { saveSmile, smiles, getImage } = useSmiles()

    const [firstTime, setFirstTime] = useState(true)

    const [image, setImage] = useState()

    const handleImage = (input) => {
        if (firstTime) {
            setFirstTime(false)
        }
        setImage(input.target.files[0])
        saveSmile("ma label", input.target.files[0])
    }

    return (
        <>
            {/* Navbar */}


            {/* Image upload screen */}
            {image && <img style={{width: "50px"}} alt={image.name} src={URL.createObjectURL(image)}></img>}

            {/* Create button */}
            {firstTime && <h1 className={styles.newentrybuttontip}>Upload an image of you smiling to get started</h1>}
            <button className={styles.newentrybutton} onClick={() => {
                document.getElementsByClassName('imginput')[0].click()
            }}>
                <h1 className={styles.newentrybuttontext}>+</h1>
            </button>
            <input onChange={handleImage} className="imginput" style={{display:"none"}} type="file" accept="image/*" />
            
            {/* Smiles */}
            Smiles:
            <br />
            {currentUser.uid}
            <br></br>
            {smiles.map((smile) => {
                return (
                <>
                    {smile.label}
                    {smile.localTime.day}
                </>
                )
            })}
            <button onClick={logout}>Sign Out</button>
        </>
    )
}

export default Dashboard