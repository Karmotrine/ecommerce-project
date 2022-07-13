import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";
import { collections } from "../firebaseClient";
import { Transaction } from "../types";

export default function useTransactionMutation() {
    const ref = collections.transactions
    const mutation = useFirestoreCollectionMutation(ref);
    return {
        mutationInstance : mutation,
        addTransaction: async (thisTransaction:Transaction) => {
            const newDoc = await mutation.mutateAsync(thisTransaction)
            if (!mutation.isError)
                return newDoc.id
        }
    }
}