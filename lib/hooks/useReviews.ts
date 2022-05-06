import { getDownloadURL } from "@firebase/storage"
import { useFirestoreDocumentData, useFirestoreQueryData } from "@react-query-firebase/firestore"
import { collection, doc, FieldPath, onSnapshot, orderBy, query, QueryConstraint, where } from "firebase/firestore"
import { ref } from "firebase/storage"
import { useEffect, useState } from "react"
import { useQuery, useQueryClient, UseQueryResult } from "react-query"
import { collections, firestore, storage } from "../firebaseClient"
import { Review } from "../types"
import { useUser } from "./useUser"


/**
 * 
 *  not sure of gcs-mirror and prefixes on useProductReviewsImages
 * 
 */

export function useProductReviews(productId: string): UseQueryResult<Review[]> {
    const user = useUser()
    const collection = collections.productReviews(productId)

    const constraints: QueryConstraint[] = []
    constraints.push(orderBy('created_at', 'desc'));

    return useFirestoreQueryData(
        ['reviews', productId],
        query(collection, ...constraints),
        {
            subscribe: true,
        },
        {
            enabled: !user.isLoading,
        },
    )
} // export function useProductReviews(productId: string): UseQueryResult<Review[]>

export function useProductReview(productId: string, reviewId: string): UseQueryResult<string[]> {
    const collection = collections.productReviews(productId)

    return useFirestoreDocumentData(
        ['reviews', productId, reviewId],
        doc(collection, reviewId),
        {
            subscribe: true,
        }
    )
} // export function useProductReview(productId: string, reviewId: string): UseQueryResult<string[]>

export function useProductReviewsImages(productId: string, userId: string): UseQueryResult<string[]> {
    const client = useQueryClient()
    const key = ['reviews', productId, 'images', userId];
    const [ ready, setReady ] = useState(false);

    useEffect(() => {
        const items = collection(
            firestore,
            'gcs-mirror',
            `${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}`,
            'prefixes',
            userId,
            'prefixes',
            'reviews',
            'prefixes',
            productId,
            'items',
        )

        return onSnapshot(items, async (snapshot) => {
            const ids = snapshot.docs.map((doc) => doc.data().gcsMetadata.name)
            const urls = await Promise.all(
                ids.map((id) => {
                    return getDownloadURL(ref(storage, id))
                })
            )
            client.setQueryData(key, urls)
            setReady(true)
        })
    }), [userId, productId]

    return useQuery<string[]>(
        key, () => {
            const data = client.getQueryData<Array<string>>(key)
            return data || [];
        },
        {
            enabled: ready,
        }
    )
} // export function useProductReviewsImages(productId: string, userId: string): UseQueryResult<string[]>