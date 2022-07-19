import { deleteDoc, doc, setDoc, Timestamp, updateDoc } from "firebase/firestore"

import { collections, storage } from "../firebaseClient"
import { Content } from "../types"
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore"
//import { productConverter } from "../converters"
export function useContentMutation() {
    const contentRef = collections.content
    const contentMutation = useFirestoreCollectionMutation(contentRef, {
        onSuccess(data) {
            const docRef = doc(contentRef, data.id)
            updateDoc(docRef, {
                "id": data.id,
            })
        }
    });
    return {
        mutationInstance : contentMutation,
        addContent: async (thisContent:Content) => {
            try{
                const newDoc = await contentMutation.mutateAsync(thisContent)
                return newDoc.id
            } catch(err) {
                throw err
            }
        },
    }
}

export function useContentDocMutation() {
    return {
        deleteContent: (contentId: string) => {
            const docRef = doc(collections.content, contentId)
            deleteDoc(docRef)
        },
        updateContent: (contentId: string, contentPayload) => {
            const docRef = doc(collections.content, contentId)
            updateDoc(docRef, contentPayload)
        }
    }
}