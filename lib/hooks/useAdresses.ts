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
type UseAddresses = {
    addresses : Address[]
    addAddress: (address:Address) => void
    removeAddress: (address:Address) => void
    clearAddressList: () => void
    getAddress: (address:Address) => Address | undefined
}

export function useAddresses() : UseAddresses {
    const client = useQueryClient()
    const user = useUser()
    const ref = doc(collections.addresses, user.data?.uid ?? '-');
    const addresses = useFirestoreDocumentData('addresses', ref)
    const addressItems = (!user ? [] : addresses.data?.list)

    const mutation = useFirestoreDocumentMutation(
        ref, {merge: true}, {
            onMutate(data) {
                client.setQueryData('addresses', data)
            },
        },
    )

    function mutate(addresses: Address[]) {
        return mutation.mutate({addresses})
    }
    return {
        addresses: addressItems,
        addAddress: (address:Address) => {
            mutate(!!addressItems ? [...addressItems, address] : [address])
        },
        removeAddress(address:Address) {
            mutate(addressItems.filter((toRemoveAddress:Address) => toRemoveAddress !== address))
        },
        clearAddressList() {
            mutate([])
        },
        getAddress(address:Address) {
            return addressItems.find((toFindAddress:Address) => toFindAddress === address)
        }
    }
} // export function useAddresses()