import { doc } from "@firebase/firestore"
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore"
import { collections } from "../firebaseClient"
import { useUser } from "./useUser"

export default function useAddressesMutation() {
    const user = useUser()
    if (!user.data) {
        throw new Error('This mutation requires authentication')
    }
    const documentRef = doc(collections.addresses(user.data.uid), "addresses")
    const mutation = useFirestoreDocumentMutation(documentRef)
    
}