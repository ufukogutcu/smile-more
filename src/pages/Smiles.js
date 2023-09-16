import { useSmiles } from "../contexts/SmilesContext"

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

    let calendar = {}
    let specialMonths = [2,4,6,9,11]

    //Last year
    let lastYear = {}
    for (let month=nowMonth; month>=1; month--) {
        let days = {}
        for (let day=1; day<=31; day++) {
            if (specialMonths.includes(month) && day===31) {continue;}
            let data = []
                for (let smile of smiles) {
                    if (smile.localTime.year===nowYear && smile.localTime.day === day && smile.localTime.month === month) {
                        data.push(smile)
                    }
                }
            days[day] = data    
        }
        lastYear[month] = days
    }
    calendar[nowYear] = lastYear

    //Middle years
    for (let year = nowYear-1; year>oldestYear;year--) {
        let months = {}
        for (let month=12; month>=1; month--) {
            let days = {}
            for (let day=1; day<=31; day++) {
                if (specialMonths.includes(month) && day===31) {continue;}
                let data = []
                for (let smile of smiles) {
                    if (smile.localTime.year===year && smile.localTime.day === day && smile.localTime.month === month) {
                        data.push(smile)
                    }
                }
                days[day] = data
            }
            months[month] = days
        }
        calendar[year] = months
    }
    //Firt year
    let firstYear = {}
    for (let month=12; month>=oldestMonth; month--) {
        let days = {}
        for (let day=1; day<=31; day++) {
            if (specialMonths.includes(month) && day===31) {continue;}
            let data = []
            for (let smile of smiles) {
                if (smile.localTime.year===oldestYear && smile.localTime.day === day && smile.localTime.month === month) {
                    data.push(smile)
                }
            }
            days[day] = data
        }
        firstYear[month] = days
    }
    calendar[oldestYear] = firstYear

    console.log(calendar)

    return (
        <>
            Smiles:<br />
        </>
    )
}

export default Smiles
