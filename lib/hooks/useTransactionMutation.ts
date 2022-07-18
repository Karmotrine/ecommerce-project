import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useFirestoreCollectionMutation, useFirestoreDocumentDeletion, useFirestoreDocumentMutation, useFirestoreTransaction } from "@react-query-firebase/firestore";
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

export function useTransactionDocMutation() {
/*    
    const docMutation = useFirestoreDocumentMutation(docRef, {
        merge: true,
    }) 
*/
    return {
        fulfillTransaction: (transId: string) => {
            const docRef = doc(collections.transactions, transId)
            updateDoc(docRef,{
                "metadata.currentStatus.isReceived": true,
            })
        },
        confirmPayment: (transId: string) => {
            const docRef = doc(collections.transactions, transId)
            updateDoc(docRef,{
                "paymentDetails.isPaid": true,
            })
        },
        confirmShipping: (transId: string) => {
            const docRef = doc(collections.transactions, transId)
            updateDoc(docRef,{
                "metadata.currentStatus.isShipped": true,
            })
        },
        cancelTransaction: (transId: string) => {
            const docRef = doc(collections.transactions, transId)
            updateDoc(docRef,{
                "metadata.currentStatus.isCancelled": true,
            })
        },
        deleteTransaction: (transId: string) => {
            const docRef = doc(collections.transactions, transId)
            deleteDoc(docRef)
        }
    }
}