import React, { useContext, useState, useEffect } from "react"
import { db, collection, doc, setDoc, onSnapshot, query, storage, ref, uploadBytes, getDownloadURL, serverTimestamp } from "../firebase"
import { useAuth } from "../contexts/AuthContext"

export function useSmiles() {
    return useContext(SmilesContext)
}

const SmilesContext = React.createContext()

export function SmilesProvider({children}) {
    const { currentUser } = useAuth()

    const [smiles, setSmiles] = useState([])

    async function saveImage(image) {
        let pre = ""
        if (currentUser.isAnonymous) {pre = "GUEST-"}
        const storageRef = ref(storage, `${pre}${currentUser.uid}/${image.size}-${image.lastModified}--${image.name}`)
        await uploadBytes(storageRef, image)
        return getDownloadURL(storageRef)
    }

    async function saveSmile(label, image) {
        if (!currentUser) {return}
        const imageURL = await saveImage(image)
        let pre = ""
        if (currentUser.isAnonymous) {pre = "GUEST-"}
        const collectionRef = collection(db, `${pre}${currentUser.uid}`)
        const now = new Date()
        setDoc(doc(collectionRef), {
                label: label,
                imageURL: imageURL,
                serverTime: serverTimestamp(),
                localTime: {
                    day: now.getDate(),
                    month: now.getMonth() + 1,
                    year: now.getFullYear()
                }
            }
        )
    }

    useEffect(() => {
        if (currentUser) {
            let pre = ""
        if (currentUser.isAnonymous) {pre = "GUEST-"}
            const q = query(collection(db, `${pre}${currentUser.uid}`))
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

    const value = {
        saveSmile,
        smiles,
    }

    return (
        <SmilesContext.Provider value={value}>
            {children}
        </SmilesContext.Provider>
    )
}