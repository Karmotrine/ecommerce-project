import { doc, updateDoc } from "firebase/firestore";
import { useFirestoreCollectionMutation, useFirestoreDocumentMutation, useFirestoreTransaction } from "@react-query-firebase/firestore";
import { collections } from "../firebaseClient";
import { Transaction } from "../types";

export function useTransactionMutation(transId?: string) {
    const collectionRef = collections.transactions
    const collectionMutation = useFirestoreCollectionMutation(collectionRef);
    return {
        mutationInstance : collectionMutation,
        addTransaction: async (thisTransaction:Transaction) => {
            try{
                const newDoc = await collectionMutation.mutateAsync(thisTransaction)
                return newDoc.id
            } catch(err) {
                throw err
            }
        },
    }
}

export function useTransactionDocMutation(transId: string) {
    const docRef = doc(collections.transactions, transId)
    const docMutation = useFirestoreDocumentMutation(docRef, {
        merge: true,
    })
    return {
        fulfillTransaction: () => {
            updateDoc(docRef,{
                "metadata.currentStatus.isReceived": true,
            })
        },
        confirmPayment: () => {
            updateDoc(docRef,{
                "paymentDetails.isPaid": true,
            })
        },
        confirmShipping: () => {
            updateDoc(docRef,{
                "metadata.currentStatus.isShipped": true,
            })
        },
        cancelTransaction: () => {
            updateDoc(docRef,{
                "metadata.currentStatus.isCancelled": true,
            })
        }
    }
}