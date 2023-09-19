import styles from "./DashboardStyles/SmilesofDay.module.css"

import { useSmiles } from "../contexts/SmilesContext"

function SmilesofDay(props) {
    const { deleteSmile, setFilter, filteredSmiles } = useSmiles()

    const handleBack = () => {
        setFilter(undefined)
    }

    const handleDelete = (smile) => {
        deleteSmile(smile)
    }

    return (
        <div className={styles.page}>
            <button className={styles.returnbutton} onClick={handleBack}>&lt;</button>
            <div className={styles.smiles}>
                {filteredSmiles.map((smile, index) => {
                    return (
                        <div key={index} className={styles.smile}>
                            <button onClick={() => {handleDelete(smile)}} className={styles.deletebutton}>X</button>
                            <img className={styles.photo} alt={smile.label} src={smile.imageURL}></img>
                            {smile.label !=="" && <h1 className={styles.label}>{smile.label}</h1>}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SmilesofDay