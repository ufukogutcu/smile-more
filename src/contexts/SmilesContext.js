import React, { useContext, useState, useEffect } from "react"
import { db, collection, doc, setDoc, onSnapshot, query, storage, ref, uploadBytes, getDownloadURL, serverTimestamp, deleteDoc, deleteObject, where } from "../firebase"
import { useAuth } from "../contexts/AuthContext"

export function useSmiles() {
    return useContext(SmilesContext)
}

const SmilesContext = React.createContext()

export function SmilesProvider({children}) {
    const { currentUser } = useAuth()

    const [smiles, setSmiles] = useState([])

    const [dateFilter, setFilter] = useState()
    const [filteredSmiles, setFilteredSmiles] = useState([])

    async function saveImage(image) {
        let pre = ""
        if (currentUser.isAnonymous) {pre = "GUEST-"}
        const id = Math.floor(Math.random() * 500)
        const storageRef = ref(storage, `${pre}${currentUser.uid}/${image.size}-${image.lastModified}--${id}--${image.name}`)
        await uploadBytes(storageRef, image)
        return `${pre}${currentUser.uid}/${image.size}-${image.lastModified}--${id}--${image.name}`
    }

    async function saveSmile(label, image) {
        if (!currentUser) {return}
        const directory = await saveImage(image)
        const storageRef = ref(storage, directory)
        const imageURL = await getDownloadURL(storageRef)
        let pre = ""
        if (currentUser.isAnonymous) {pre = "GUEST-"}
        const now = new Date()
        const id = Math.floor(Math.random() * 500)
        const id_2 = Math.floor(Math.random() * 500)
        await setDoc(doc(db, `${pre}${currentUser.uid}`, `${directory.slice(-10)}-${label}${id}${id_2}`), {
                id: id,
                id_2, id_2,
                label: label,
                imageURL: imageURL,
                directory: directory,
                serverTime: serverTimestamp(),
                localTime: {
                    day: now.getDate(),
                    month: now.getMonth() + 1,
                    year: now.getFullYear()
                }
            }
        )
    }

    async function deleteSmile(smile) {
        const storageRef = ref(storage, smile.directory)
        await deleteObject(storageRef)
            .catch((e) => {console.log(e)})
        let pre = ""
        if (currentUser.isAnonymous) {pre = "GUEST-"}
        await deleteDoc(doc(db, `${pre}${currentUser.uid}`, `${smile.directory.slice(-10)}-${smile.label}${smile.id}${smile.id_2}`))
            .catch((e) => {console.log(e)})
    }

    useEffect(() => {
        if (currentUser) {
            let pre = ""
            if (currentUser.isAnonymous) {pre = "GUEST-"}
            let q = query(collection(db, `${pre}${currentUser.uid}`))
            const unsub = onSnapshot(q, (docs) => {
                const smiles = []
                docs.forEach((doc) => {
                    smiles.push(doc.data())
                })
                setSmiles(smiles)
            });
    
            return unsub
        }
    }, [currentUser])

    useEffect(() => {
        if (currentUser && dateFilter) {
            let pre = ""
            if (currentUser.isAnonymous) {pre = "GUEST-"}
            let q = query(collection(db, `${pre}${currentUser.uid}`), where("localTime", "==", dateFilter))
            const unsub = onSnapshot(q, (docs) => {
                const filteredSmiles = []
                docs.forEach((doc) => {
                    filteredSmiles.push(doc.data())
                })
                setFilteredSmiles(filteredSmiles)
            });
    
            return unsub
        }

        if (dateFilter === undefined) {
            setFilteredSmiles([])
        }
    }, [currentUser, dateFilter])

    const value = {
        saveSmile,
        deleteSmile,
        setFilter,
        filteredSmiles,
        smiles,
    }

    return (
        <SmilesContext.Provider value={value}>
            {children}
        </SmilesContext.Provider>
    )
}