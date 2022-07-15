import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";
import { collections } from "../firebaseClient";
import { Transaction } from "../types";

export default function useTransactionMutation() {
    const ref = collections.transactions
    const mutation = useFirestoreCollectionMutation(ref);
    return {
        mutationInstance : mutation,
        addTransaction: async (thisTransaction:Transaction) => {
            try{
                const newDoc = await mutation.mutateAsync(thisTransaction)
                return newDoc.id
            } catch(err) {
                throw err
            }
        }
    }
}