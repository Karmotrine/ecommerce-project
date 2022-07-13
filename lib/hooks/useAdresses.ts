import { useFirestoreCollectionMutation, useFirestoreDocumentData, useFirestoreDocumentMutation, useFirestoreQueryData } from "@react-query-firebase/firestore"
import { useFirestoreDocumentDeletion } from "@react-query-firebase/firestore"
import { useFirestoreQuery } from "@react-query-firebase/firestore"
import { doc, query } from "firebase/firestore"
import { useQueryClient } from "react-query"
import { collections } from "../firebaseClient"
import { Address } from "../types"
import { useUser } from "./useUser"

/**
 *  useAddresses     - Returns a list of the user's addresses
 *  useAddAddress    - Adds a new address to user's list of address
 *  useDeleteAddress - Deletes an 'address' document from user's collection of addresses
 */

export function useAddresses() {
    const client = useQueryClient()
    const user = useUser()
    if (!user.data) {
        throw new Error("Addresses can be only fetched for authenticated users.")
    }
    const ref = doc(collections.addresses, user.data?.uid ?? '-');
    const addresses = useFirestoreDocumentData('addresses', ref)
    const addressItems = (!user ? [] : addresses.data?.list)

    const mutation = useFirestoreDocumentMutation(
        ref, {merge: true}, {
            onMutate(data) {
                client.setQueryData('addresses', ref)
            },
        },
    )

    function mutate(addresses: Address[]) {
        return mutation.mutate({addresses})
    }
    return {
        addresses: addresses,
        addAddress(address:Address) {
            mutate([...addressItems, {...address}])
        },
        removeAddress(address:Address) {
            mutate(addressItems.filter((toRemoveAddress:Address) => toRemoveAddress !== address))
        },
        clearAddressList() {
            mutate([])
        },
        getItem(address:Address) {
            return addressItems.find((toFindAddress) => toFindAddress === address)
        }
    }
} // export function useAddresses()