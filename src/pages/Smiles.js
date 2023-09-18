import { useState } from "react"
import { useSmiles } from "../contexts/SmilesContext"

import SmilesofDay from "./SmilesofDay"

import styles from "./DashboardStyles/Smiles.module.css"

function Smiles() {
    const { smiles } = useSmiles()

    const now = new Date()
    const nowDay = now.getDate()
    const nowMonth = now.getMonth() + 1
    const nowYear= now.getFullYear()

    //Find oldest smile
    let oldestMonth = nowMonth
    let oldestYear = nowYear
    for (let smile of smiles) {
        if (smile.localTime.year <= oldestYear) {
            oldestYear = smile.localTime.year
            if (smile.localTime.month < oldestMonth) {
                oldestMonth = smile.localTime.month
            }
        }
    }

    let calendar = new Map()
    let specialMonths = [2,4,6,9,11]

    //Last year
    let lastYear = new Map()
    for (let month=nowMonth; month>=1; month--) {
        let days = new Map()
        let lastDay = 31
        if (month===nowMonth){lastDay=nowDay}
        for (let day=lastDay; day>=1; day--) {
            if (specialMonths.includes(month) && day===31) {continue;}
            let data = []
                for (let smile of smiles) {
                    if (smile.localTime.year===nowYear && smile.localTime.day === day && smile.localTime.month === month) {
                        data.push(smile)
                    }
                }
            days.set(day, data)    
        }
        lastYear.set(month, days)
    }
    calendar.set(nowYear, lastYear)

    //Middle years
    for (let year = nowYear-1; year>oldestYear;year--) {
        let months = new Map()
        for (let month=12; month>=1; month--) {
            let days = new Map()
            for (let day=31; day>=1; day--) {
                if (specialMonths.includes(month) && day===31) {continue;}
                let data = []
                for (let smile of smiles) {
                    if (smile.localTime.year===year && smile.localTime.day === day && smile.localTime.month === month) {
                        data.push(smile)
                    }
                }
                days.set(day, data)    
            }
            months.set(month, days)
        }
        calendar.set(year, months)
    }
    //Firt year
    if (oldestYear !== nowYear) {
        let firstYear = new Map()
        for (let month=12; month>=oldestMonth; month--) {
            let days = new Map()
            for (let day=31; day>=1; day--) {
                if (specialMonths.includes(month) && day===31) {continue;}
                let data = []
                for (let smile of smiles) {
                    if (smile.localTime.year===oldestYear && smile.localTime.day === day && smile.localTime.month === month) {
                        data.push(smile)
                    }
                }
            days.set(day, data)
            }
        firstYear.set(month, days)
        }
        calendar.set(oldestYear, firstYear)
    }

    const months = [
        "",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]

    const [showSmiles, setShowSmiles] = useState([])

    const visualizeSmiles = (smiles) => {
        return (
            <a onClick={(e) => {
                e.preventDefault()
                setShowSmiles(smiles)
            }} href="/#">
                <img className={styles.smile} alt={smiles[0].label} src={smiles[0].imageURL}></img>
            </a>
        )
    }
    
    return (
        <>
            {showSmiles.length !== 0 ? <SmilesofDay smiles={showSmiles} return={()=>{setShowSmiles([])}} /> : 
                <div className={styles.calendar}>
                {Array.from(calendar.entries()).map((items, index) => (   
                    <div className={styles.year} key={index}>
                        <h1 className={styles.yeartitle}>{items[0]}</h1>
                        <div className={styles.months}>
                        {Array.from(items[1].entries()).map((items, index) => (
                            <div className={styles.month} key={index}>
                                <h2 className={styles.monthtitle}>{months[items[0]]}</h2>
                                <div className={styles.days}>
                                {Array.from(items[1].entries()).map((items, index) => (
                                    <div className={styles.day} key={index}>
                                        {items[1].length !== 0 ? visualizeSmiles(items[1]) : items[0]}
                                    </div>
                                ))}
                                </div>
                            </div>

                        ))}
                        </div>
                    </div>
                ))
                }
                </div>
            }
        </>
    )
}

export default Smiles
