import { DocumentData, Firestore, FirestoreDataConverter, Timestamp } from "firebase/firestore"
import { Product, Customer, Session, Review, Content, Address } from "./types"


export const productConverter: FirestoreDataConverter<Product> = {
    fromFirestore(snapshot): Product {
        const data = snapshot.data()
        return {
            id: snapshot.id,
            name: data.name || '',
            active: !!data.active,
            description: data.description || '',
            images: data.images || [],
            discount: data.discount,
            metadata: {
                type: data.metadata?.type ?? '',
                price: data.metadata?.price ?? '',
            }
        }
    },
    toFirestore(product: Product) {
       return {
            id: product.id,
            name: product.name,
            active: product.active,
            description: product.description || '',
            images: product.images || [],
            discount: product.discount,
            metadata: {
                type: product.metadata.type ?? '',
                price: product.metadata.type ?? '',
            }
       }
    }
} // export const productConverter: FirestoreDataConverter<Product> 

export const reviewConverter: FirestoreDataConverter<Review> = {
    fromFirestore(snapshot): Review {
        const data = snapshot.data()
        return {
            id: data.id,
            created_at: data.created_at,
            product_id: data.product_id,
            rating: data.rating,
            message: data.message,
            user: {
                id: data.user.id,
                display_name: data.user.display_name,
                photo_url: data.user.photo_url,
            },
        }
    },
    toFirestore(review: Review) {
        return {
            created_at: review.created_at,
            product_id: review.product_id,
            rating: review.rating,
            message: review.message,
            user: {
                id: review.user.id,
                display_name: review.user.display_name,
                photo_url: review.user.photo_url,
            }
        }
    }
} // export const reviewConverter: FirestoreDataConverter<Review>

export const customerConverter: FirestoreDataConverter<Customer> = {
    fromFirestore(snapshot): Customer {
        const data = snapshot.data();

        return {
            id: data.id,
            gpay_id: data.gpay_id,
        }
    },
    toFirestore(): Customer {
        throw new Error('Client does not support updating customers.')
    }
} // export const customerConverter: FirestoreDataConverter<Customer>

export const contentConverter: FirestoreDataConverter<Content> = {
    fromFirestore(snapshot): Content {
        const data = snapshot.data();

        return {
            id: data.id,
            title: data.id,
            hero: data.hero,
            excerpt: data.excerpt,
            created_at: data.created_at,
            content: data.content
        }
    },
    toFirestore() {
        throw new Error('Client does not support updating content')
    }
} // export const contentConverter: FirestoreDataConverter<Content> = {


export const addressConverter: FirestoreDataConverter<Address> = {
    fromFirestore(snapshot): Address {
        const data = snapshot.data();

        return {
            id: data.id,
            address: data.address
        }
    },
    toFirestore(data): DocumentData {
        return data
    }
} // export const addressConverter: FirestoreDataConverter<Address>


export const sessionConverter: FirestoreDataConverter<Session> = {
    fromFirestore(snapshot): Session {
        const data = snapshot.data();

        return {
            mode: data.mode,
            success_url: data.success_url,
            cancel_url: data.cancel_url,
            customer: data.customer,
            price: data.price,
            line_items: data.line_items || [],
            shipping: data.shipping || {},
            url: data.url,
            error: data.error,
            isPaid: data.isPaid,
            isShipped: data.isShipped
        }
    },
    toFirestore(session: Session) {
        // Base session object
        let data: DocumentData = {
            mode: session.mode,
            success_url: session.success_url,
            cancel_url: session.cancel_url,
            customer: session.customer,
            price: session.price,
            line_items: session.line_items || [],
            shipping: session.shipping || {},
            metadata:{
                mode: session.mode
            }
        }
        return data
    }
} // export const sessionConverter: FirestoreDataConverter<Session>