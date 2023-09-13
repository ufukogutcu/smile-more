import React, { useContext, useState, useEffect } from "react"
import { db, collection, doc, setDoc, onSnapshot, query, storage, ref, uploadBytes, getDownloadURL } from "../firebase"
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
        const storageRef = ref(storage, `${pre}${currentUser.uid}/${image.name}-${image.size}-${image.lastModified}`)
        await uploadBytes(storageRef, image)
        return getDownloadURL(storageRef)
    }

    async function saveSmile(label, image) {
        if (!currentUser) {return}
        const imageURL = await saveImage(image)
        let pre = ""
        if (currentUser.isAnonymous) {pre = "GUEST-"}
        const collectionRef = collection(db, `${pre}${currentUser.uid}`);
        setDoc(doc(collectionRef), {
                label: label, imageURL: imageURL,
            }
        )
    }

    function getImage(url) {
        const xhr = new XMLHttpRequest()
        xhr.responseType = 'blob'
        xhr.open('GET', url)
        xhr.send()
        return xhr.response
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
        getImage
    }

    return (
        <SmilesContext.Provider value={value}>
            {children}
        </SmilesContext.Provider>
    )
}