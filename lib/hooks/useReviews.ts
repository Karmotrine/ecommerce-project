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

export function useProductReview(productId: string, reviewId: string): UseQueryResult<Review> {
    const collection = collections.productReviews(productId)

    return useFirestoreDocumentData(
        ['reviews', productId, reviewId],
        doc(collection, reviewId),
        {
            subscribe: true,
        }
    )
} // export function useProductReview(productId: string, reviewId: string): UseQueryResult<string[]>