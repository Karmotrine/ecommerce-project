import { useFirestoreDocumentData } from "@react-query-firebase/firestore";
import { doc, DocumentData, orderBy, query, QueryConstraint } from "firebase/firestore"
import { UseQueryResult } from "react-query"
import { collections } from "../firebaseClient";
import { Content } from "../types";
import { useUser } from "./useUser"


export function useContent(contentId : string): UseQueryResult<DocumentData> {
    const user = useUser()
    const collection = collections.contentFilter
    const ref = doc(collection, contentId)

    return useFirestoreDocumentData<Content>(['content', contentId],ref,
        {subscribe: true},
        /*{enabled: user.isSuccess && !!user.data}*/)
} // export function useOrders(): UseQueryResult<DocumentData>