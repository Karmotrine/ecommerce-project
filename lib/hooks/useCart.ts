import { useFirestoreDocumentData, useFirestoreDocumentMutation } from "@react-query-firebase/firestore"
import { doc } from "firebase/firestore"
import { useQueryClient } from "react-query"

import { collections } from "../firebaseClient"
import { Product } from "../types"
import { useUser } from "./useUser"

export type CartItem = Product & { quantity: number };

type UseCart = {
    cart: CartItem[]
    total: number
    addToCart: (product: Product, quantity?: number) => void
    setQuantity: (product: Product, quantity?: number) => void
    removeFromCart: (product: Product) => void
    clearCart: () => void
    getItem: (product: Product) => CartItem | undefined
}

export function useCart(): UseCart {
    const client = useQueryClient()
    const user = useUser()
    const ref = doc(collections.cart, user.data?.uid ?? '-');

    const cart = useFirestoreDocumentData('cart', ref)

    const cartItems = (!user ? [] : cart.data?.items ?? []) as CartItem[]

    const mutation = useFirestoreDocumentMutation(
        ref,
        {
            merge: true,
        },
        {
            onMutate(data) {
                client.setQueryData('cart', data)
            },
        },
    )

    function mutate(items: CartItem[]) {
        return mutation.mutate({items})
    }

    return {
        cart: cartItems,
        total: cartItems.reduce((total, item) => {
            const price = parseInt(item.metadata.discount) == 0 
                          ? parseFloat(item.metadata.price) :
                          parseFloat(item.metadata.price) - (parseFloat(item.metadata.price)*(parseInt(item.metadata.discount)/100));
            return total + price * item.quantity
        }, 0),
        addToCart(product, quantity = 1) {
            mutate([...cartItems, { ...product, quantity} ]);
        },
        setQuantity(product, quantity) {
            const items = [...cartItems];
            const index = items.findIndex((item) => item.id === product.id);

            if (index > -1) {
                items[index].quantity = quantity;
            }

            mutate(items);
        },
        removeFromCart(product) {
            mutate(cartItems.filter((toRemoveProduct) => toRemoveProduct.id !== product.id ))
        },
        clearCart() {
            mutate([])
        },
        getItem(product) {
            return cartItems.find((toFindProduct) => toFindProduct.id === product.id);
        }
    }
} // export function useCart(): UseCart