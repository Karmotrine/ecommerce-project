import { v4 as uuid } from 'uuid'
import { useMutation, useQueryClient, UseMutationResult } from 'react-query'
import { doc, setDoc, Timestamp } from "firebase/firestore"
import { ref, uploadBytes } from "firebase/storage"

import { collections, storage } from "../firebaseClient"
import { useUser } from "./useUser"
import { Review } from "../types"
import { reviewConverter } from '../converters'

type ReviewMutation = Pick<Review, 'rating' | 'message' | 'files'>

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

            type UploadTask = () => Promise<void>;
            const uploads: UploadTask[] = [];

            review.files?.forEach((file) => {
                uploads.push(async () => {
                    const storageRef = ref(storage, `${userData.uid}/reviews/${productId}/${uuid()}`)
                    await uploadBytes(storageRef, file, {
                        contentType: file.type,
                        customMetadata: {
                            uuid: userData.uid,
                            name: file.name,
                        },
                    })
                })
            })
            
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
                ...uploads.map((task) => task()),
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
