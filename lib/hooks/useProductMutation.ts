import { v4 as uuid } from "uuid"
import { useMutation, useQueryClient, UseMutationResult } from "react-query"
import { doc, setDoc, Timestamp } from "firebase/firestore"
import { ref, uploadBytes, uploadString } from "firebase/storage"

import { collections, storage } from "../firebaseClient"
import { useUser } from "./useUser"
import { Review, ProductType } from "../types"
//import { productConverter } from "../converters"

//ProductMutation?

// fix productType -> != any
export function useProductMutation(
    productId: string, 
    productDesc: string, 
    productName: string,
    productImage: string[],
    productType: any,
    productPrice: string,
    productDiscount: number,
    productStockLeft: number
    ) {
        const client = useQueryClient()
        const user = useUser()

        return useMutation<string, Error> (
            async(product) => {
                if(!user.data && (user.data.uid !== process.env.NEXT_PUBLIC_FIREBASE_ADMIN_UID)) {
                    throw new Error('This mutation requires administrator authorization')
                }
                const documentRef = doc(collections.products)
                await Promise.all([
                    setDoc(documentRef, {
                        id: productId,
                        name: productName,
                        active: true,
                        description: productDesc,
                        images: productImage,
                        discount: productDiscount,
                        metadata: {
                            type: productType,
                            price: productPrice,
                            stockLeft: productStockLeft
                        }
                    }),
                ])
                //not sure
                return documentRef.id
            },
            {
                onSuccess(productId) {
                    client.invalidateQueries(['products', productId])
                }
            }
        )
}
