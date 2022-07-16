import { useFirestoreDocumentData } from "@react-query-firebase/firestore";
import { doc, DocumentData, orderBy, query, QueryConstraint } from "firebase/firestore"
import { UseQueryResult } from "react-query"
import { collections } from "../firebaseClient";
import { Transaction } from "../types";
import { useUser } from "./useUser"


export function useTransaction(transId : string): UseQueryResult<DocumentData> {
    const user = useUser()
    const collection = collections.transactionFilter
    const ref = doc(collection, transId)

    return useFirestoreDocumentData<Transaction>(['transaction', transId],ref,
        {subscribe: true},
        /*{enabled: user.isSuccess && !!user.data}*/)
} // export function useOrders(): UseQueryResult<DocumentData>