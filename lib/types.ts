import { Timestamp } from "@firebase/firestore"
import { CartItem } from "./hooks/useCart"
/**
 *  Think of what products do we have?
 *  (Dish, Add-ons)?
 */
export type ProductType = 'ramen' | 'bento' | 'extra' | 'beverage'

type ProductRecord = {
    id: string
    name: string
    active: boolean
    description: string
    img: string[]
}

type ProductRecordMetadata = {
    discount: string
    type: ProductType
    price: string
    stockLeft: number
}

/**
 *  Elaborate metadata for Dish Products
 */

export type ProductRamen = {
    metadata: {
        type: "ramen"
    } & ProductRecordMetadata
} & ProductRecord

export type ProductBento = {
    metadata: {
        type: "bento"
    } & ProductRecordMetadata
} & ProductRecord

export type ProductExtra = {
    metadata: {
        type: "extra"
    } & ProductRecordMetadata
} & ProductRecord

export type ProductBeverage = {
    metadata: {
        type: "beverage"
    } & ProductRecordMetadata
} & ProductRecord


export type Product = ProductRamen | ProductBento | ProductExtra | ProductBeverage

export function isProductDish(product: Product): product is ProductRamen {
    return product.metadata.type === 'ramen'
}
export function isProductSidedish(product: Product): product is ProductBento {
    return product.metadata.type === 'bento'
}
export function isProductExtra(product: Product): product is ProductExtra {
    return product.metadata.type === 'extra'
}
export function isProductBeverage(product: Product): product is ProductBeverage {
    return product.metadata.type === 'beverage'
}

export type Review = {
    id: string
    created_at: Date
    product_id: string
    rating: number
    message: string
    user: {
        id: string,
        display_name: string
        photo_url?: string
    }
    //Add attribute scores for profanity filter?
}

export interface Content {
    id: string
    title: string
    hero: string
    excerpt: string
    created_at: Timestamp
    content: string
}

export interface Transaction {
    _id?: string
	paymentDetails: {
        /* is the document id on 'transactions' collection*/
		orderId: string 
		orderType: 'pick-up' | 'delivery'
		branch: string
		/*if ('paypal/cc')*/
			payerId: string
			paymentId: string | null;
			billingToken: string | null;
			facilitatorAccesstoken: string
		/*if ('cod')*/
		isPaid: boolean
	}
    cart: CartItem[]
    metadata: {
        userid: string
        address: Address
        paymentMethod: 'cod' | 'cc' | 'paypal'  /*paymentSource on paypalbuttons*/
        currentStatus: orderStatus
        DeliDate: Date | Timestamp
        Notes: string
    }
}

export interface orderStatus {
    isPlaced: boolean
    isShipped: boolean
    isReceived: boolean
    isCancelled: boolean
}

export interface Address {
    uid: string
    recipientName: string
    nameId: string
    metadata: {
        region: string
        province: string
        cityMun: string
        addressLine: string
        postalCode: string
    }
}