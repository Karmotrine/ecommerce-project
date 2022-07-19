import { v4 as uuid } from "uuid"
import { useMutation, useQueryClient, UseMutationResult } from "react-query"
import { deleteDoc, doc, setDoc, Timestamp, updateDoc } from "firebase/firestore"
import { ref, uploadBytes, uploadString } from "firebase/storage"

import { collections, storage } from "../firebaseClient"
import { useUser } from "./useUser"
import { Review, ProductType, Product } from "../types"
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore"
//import { productConverter } from "../converters"

//ProductMutation?

// fix productType -> != any
export function useProductMutation() {
    const collectionRef = collections.products
    const collectionMutation = useFirestoreCollectionMutation(collectionRef, {
        onSuccess(data) {
            const docRef = doc(collectionRef, data.id)
            updateDoc(docRef, {
                "id": data.id,
            })
        }
    });
    return {
        mutationInstance : collectionMutation,
        addProduct: async (thisProduct:Product) => {
            try{
                const newDoc = await collectionMutation.mutateAsync(thisProduct)
                return newDoc.id
            } catch(err) {
                throw err
            }
        },
    }
}

export function useProductDocMutation() {
    return {
        adjustDiscount: (newDiscount: string, prodId: string) => {
            const docRef = doc(collections.products, prodId)
            updateDoc(docRef,{
                "metadata.discount": newDiscount,
            })
        },
        adjustStatus: (prevStatus: boolean ,prodId: string) => {
            const docRef = doc(collections.products, prodId)
            updateDoc(docRef,{
                "active": !prevStatus,
            })
        },
        adjustStocks: (newStockNo: number, prodId: string) => {
            const docRef = doc(collections.products, prodId)
            updateDoc(docRef, {
                "metadata.stockLeft" : newStockNo,
            })
        },
        adjustPrice: (newPrice: string, prodId: string) => {
            const docRef = doc(collections.products, prodId)
            updateDoc(docRef, {
                "metadata.price" : newPrice,
            })
        },
        deleteProduct: (prodId: string) => {
            const docRef = doc(collections.products, prodId)
            deleteDoc(docRef)
        }
    }
}