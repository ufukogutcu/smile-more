import style from "./Alert.module.css"
import { useState } from "react"

function Alert(props) {
    const [visible, setVisibility] = useState(true)
    const [disappearing, disappear] = useState(false)

    const handleClose = () => {
        disappear(true)
        setTimeout(() => {
            setVisibility(false)
          }, 500);
    }

    if (!visible) {
        return <></>
    }
    return (
        <div className={!disappearing ? style.alert:`${style.alert} ${style.disappear}`}>
            <div className={style.content}>
                {props.children}
            </div>
            <button className={style.closebutton} onClick={handleClose}>X</button>
        </div>
    )
}

export default Alert