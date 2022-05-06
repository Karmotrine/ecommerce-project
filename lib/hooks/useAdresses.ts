import { useFirestoreCollectionMutation, useFirestoreQueryData } from "@react-query-firebase/firestore"
import { useFirestoreDocumentDeletion } from "@react-query-firebase/firestore"
import { useFirestoreQuery } from "@react-query-firebase/firestore"
import { doc, query } from "firebase/firestore"
import { collections } from "../firebaseClient"
import { Address } from "../types"
import { useUser } from "./useUser"

/**
 *  useAddresses     - Returns a list of the user's addresses
 *  useAddAddress    - Adds a new address to user's list of address
 *  useDeleteAddress - Deletes an 'address' document from user's collection of addresses
 */

export function useAddresses() {
    const user = useUser()
    if (!user.data) {
        throw new Error("Addresses can be only fetched for authenticated users.")
    }

    /**
     *  What is subscribe?
     */
    const collection = collections.addresses(user.data.uid)
    return useFirestoreQueryData(
        'addresses',
        query(collection),
        {
            subscribe:true
        }
    )
} // export function useAddresses()

export function useAddAddress() {
    const user = useUser()
    if (!user.data) {
        throw new Error("Addresses can be only fetched for authenticated users.")
    }

    const collection = collections.addresses(user.data.uid)
    return useFirestoreCollectionMutation<Omit<Address, 'id'>>(collection)
} // export function useAddAddress()

export function useDeleteAddress(id: string) {
    const user = useUser()
    if (!user.data) {
        throw new Error("Addresses can be only fetched for authenticated users.")
    }
    
    const collection = collections.addresses(user.data.uid)
    return useFirestoreDocumentDeletion(doc(collection, id));
} // export function useDeleteAddress(id: string)