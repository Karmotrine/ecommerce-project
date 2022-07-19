import { namedQuery, useFirestoreQueryData, NamedQuery } from "@react-query-firebase/firestore"
import { query, QueryConstraint, Query } from "firebase/firestore"
import { QueryKey, UseQueryResult } from "react-query"
import { collections, firestore } from "../firebaseClient"
import { Content } from "../types"

function isQueryConstraints(value: unknown): value is QueryConstraint[] {
    return Array.isArray(value)
}

export default function useContents(key:QueryKey, constraintsOrNamedQuery?: QueryConstraint[] | string) : UseQueryResult {
        const collection = collections.contentFilter
        let ref: Query<Content> | NamedQuery<Content>
        if (constraintsOrNamedQuery) {
            if (isQueryConstraints(constraintsOrNamedQuery)) {
                ref = query(collection, ...constraintsOrNamedQuery);
            } else {
                ref = namedQuery(firestore, constraintsOrNamedQuery)
            }
        } else {
            ref = query(collection);
        }
        return useFirestoreQueryData(
            key,
            ref,
            {
                idField: "id",
                subscribe: true
            }
        );
}