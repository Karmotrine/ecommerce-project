import { Timestamp } from "@firebase/firestore"

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
    images: string[]
    discount: number
}

type ProductRecordMetadata = {
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
    files?: File[];
    user: {
        id: string,
        display_name: string
        photo_url?: string
    }
    //Add attribute scores for profanity filter?
}

export interface Customer {
    id: string
    gpay_id: string
}

export interface Content {
    id: string
    title: string
    hero: string
    excerpt: string
    created_at: Timestamp
    content: string
}

export interface Session {
    mode: 'payment'
    success_url: string
    cancel_url: string
    customer: string    //gpay customer id
    line_items?: (
        |   {
                price: string
                quantity: number
            }
        |   {
                price_data: {
                    currency: string
                    unit_amount_decimal: number
                    product_data: {
                        name: string
                        description?: string
                    }
                }
                quantity: number
            }
    )[]
    price?:string
    shipping: {
        name: string
        address: {
            addressLine1: string
            addressLine2: string
            region: string
            city: string
            postalCode: string
        }
    }
    url?: string
    error?: {
        message:string
    }
    isShipped: boolean
    isPaid: boolean

}

export interface Address {
    id: string
    address: {
        addressLine1: string
        addressLine2: string
        region: string
        city: string
        postalCode: string
    }
}