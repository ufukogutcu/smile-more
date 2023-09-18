import styles from "./DashboardStyles/SmilesofDay.module.css"

import { useSmiles } from "../contexts/SmilesContext"

function SmilesofDay(props) {
    const { deleteSmile } = useSmiles()

    return (
        <div className={styles.page}>
            <button className={styles.returnbutton} onClick={props.return}>return</button>
            <div className={styles.smiles}>
                {props.smiles.map((smile, index) => {
                    return (
                        <div key={index} className={styles.smile}>
                            <button onClick={()=>{
                                deleteSmile(smile)
                                props.return()
                            }} className={styles.deletebutton}>X</button>
                            <img className={styles.smilephoto} alt={smile.label} src={smile.imageURL}></img>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SmilesofDay