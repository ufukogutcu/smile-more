import { useState, useRef } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useSmiles } from "../contexts/SmilesContext"
import newentrybuttonStyles from "./DashboardStyles/new_entry_button.module.css"
import uploadscreenStyles from "./DashboardStyles/upload_screen.module.css"

function Dashboard() {
    const { currentUser, logout } = useAuth()
    const { saveSmile, smiles } = useSmiles()

    const [firstTime, setFirstTime] = useState(true)

    const [image, setImage] = useState()

    const labelRef = useRef()

    const handleImage = (input) => {
        if (firstTime) {
            setFirstTime(false)
        }
        setImage(input.target.files[0])
    }

    return (
        <>
            {/* Navbar */}


            {/* Image upload screen */}
            {image && 
                <div className={uploadscreenStyles.uploadscreen}>
                    <button onClick={(e) => {
                        e.preventDefault()
                        setImage(null)
                    }}className={uploadscreenStyles.uploadscreenclosebutton}>X</button>
                    <div className={uploadscreenStyles.uploadimagecontainer}>
                        <img className={uploadscreenStyles.uploadimage} alt={image.name} src={URL.createObjectURL(image)}></img>
                    </div>
                    <form>
                        <input className={uploadscreenStyles.uploadlabel} type="text" ref={labelRef}></input>
                        <button className={uploadscreenStyles.uploadbutton} type="submit" onClick={(e) => {
                            e.preventDefault()
                            saveSmile(labelRef.current.value, image)
                            setImage(null)
                        }}>
                            Save smile
                        </button>
                    </form>
                </div>
            }

            {/* Create button */}
            {firstTime && <h1 className={newentrybuttonStyles.newentrybuttontip}>Upload an image of you smiling to get started</h1>}
            <button className={newentrybuttonStyles.newentrybutton} onClick={() => {
                document.getElementsByClassName('imginput')[0].click()
            }}>
                <h1 className={newentrybuttonStyles.newentrybuttontext}>+</h1>
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
                    {smile.label}<br></br>
                </>
                )
            })}
            <button onClick={logout}>Sign Out</button>
        </>
    )
}

export default Dashboard