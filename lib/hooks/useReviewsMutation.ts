import { v4 as uuid } from 'uuid'
import { useMutation, useQueryClient, UseMutationResult } from 'react-query'
import { doc, setDoc, Timestamp } from "firebase/firestore"
import { ref, uploadBytes } from "firebase/storage"

import { collections, storage } from "../firebaseClient"
import { useUser } from "./useUser"
import { Review } from "../types"
import { reviewConverter } from '../converters'

type ReviewMutation = Pick<Review, 'rating' | 'message' >

export function useReviewMutation(productId: string): UseMutationResult<string, Error, ReviewMutation> {
    const client = useQueryClient()
    const user = useUser()

    return useMutation<string, Error, ReviewMutation> (
        async(review) => {
            if (!user.data) {
                throw new Error('This mutation requires authentication')
            }
            const userData = user.data
            const documentRef = doc(collections.productReviews(productId), userData.uid)

            await Promise.all([
                setDoc(documentRef, {
                    id: documentRef.id,
                    created_at: Timestamp.now(),
                    product_id: productId,
                    rating: review.rating,
                    message: review.message,
                    user: {
                        id: userData.uid,
                        display_name: userData.displayName ?? userData.email ?? userData.uid,
                        photo_url: userData.photoURL ?? '',
                    },

                }),
            ])
            return documentRef.id;
        },
        {
            onSuccess(reviewId) {
                client.invalidateQueries(['reviews', productId, reviewId])
            }
        }
    )
} // export function useReviewMutation(productId: string): UseMutationResult<string, Error, ReviewMutation>
