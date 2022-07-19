import { DocumentData, Firestore, FirestoreDataConverter, Timestamp } from "firebase/firestore"
import { Product, Transaction, Review, Content, Address } from "./types"


export const productConverter: FirestoreDataConverter<Product> = {
    fromFirestore(snapshot): Product {
        const data = snapshot.data()
        return {
            id: snapshot.id,
            name: data.name || '',
            active: !!data.active,
            description: data.description || '',
            img: data.img || [],
            metadata: {
                discount: data.metadata.discount ?? '',
                type: data.metadata?.type ?? '',
                price: data.metadata?.price ?? '',
                stockLeft: data.metadata?.stockLeft ?? ''
            }
        }
    },
    toFirestore(product: Product) {
       return {
            id: product?.id,
            name: product.name,
            active: product.active,
            description: product.description || '',
            img: product.img || [],
            metadata: {
                discount: product.metadata.discount,
                type: product.metadata.type ?? '',
                price: product.metadata.price ?? '',
                stockLeft: product.metadata?.stockLeft ?? ''
            }
       }
    }
} // export const productConverter: FirestoreDataConverter<Product> 

export const reviewConverter: FirestoreDataConverter<Review> = {
    fromFirestore(snapshot): Review {
        const data = snapshot.data()
        return {
            id: data.id,
            created_at: (data.created_at as Timestamp).toDate(),
            product_id: data.product_id,
            rating: data.rating ?? 0,
            message: data.message ?? '',
            user: {
                id: data.user.id,
                display_name: data.user.display_name,
                photo_url: data.user.photo_url ?? '',
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
                photo_url: review.user.photo_url ?? '',
            }
        }
    }
} // export const reviewConverter: FirestoreDataConverter<Review>

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
    toFirestore(article:Content) {
        return {
            id: article.id,
            title: article.title,
            hero: article.hero,
            excerpt: article.excerpt, 
            created_at: article.created_at,
            content: article.content
        }
    }
} // export const contentConverter: FirestoreDataConverter<Content> = {


export const addressConverter: FirestoreDataConverter<Address> = {
    fromFirestore(snapshot): Address {
        const data = snapshot.data();

        return {
            uid: data.uid,
            nameId: data.nameId,
            recipientName: data.recipientName,
            metadata: {
                region: data.region,
                province: data.province,
                cityMun: data.cityMun,
                addressLine: data.addressLine,
                postalCode: data.postalCode,
            }
        }
    },
    toFirestore(address:Address): DocumentData {
        return {
            uid: address.uid,
            nameId: address.nameId,
            recipientName: address.recipientName,
            address: {
                region: address.metadata.region,
                province: address.metadata.province,
                cityMun: address.metadata.cityMun,
                addressLine: address.metadata.addressLine,
                postalCode: address.metadata.postalCode,
            }
        }
    }
} // export const addressConverter: FirestoreDataConverter<Address>


export const transactionConverter: FirestoreDataConverter<Transaction> = {
    fromFirestore(snapshot): Transaction {
        const data = snapshot.data();

        return {
            paymentDetails: {
                /* is the document id on 'transactions' collection*/
                orderId: data.paymentDetails.orderId,
                orderType: data.paymentDetails.orderType,
                branch: data.paymentDetails.branch,
                /*if ('paypal/cc')*/
                    payerId: data.paymentDetails.payerId,
                    paymentId: data.paymentDetails.paymentId,
                    billingToken: data.paymentDetails.paymentId,
                    facilitatorAccesstoken: data.facilitatorAccesstoken,
                isPaid: data.paymentDetails.isPaid
            },
            cart: data.cart,
            metadata: {
                userid: data.metadata.userid,
                address: data.metadata.address,
                paymentMethod: data.metadata.paymentMethod,
                currentStatus: data.metadata.currentStatus,
                DeliDate: data.metadata.DeliDate,
                Notes: data.metadata.Notes
            }
        }
    },
    toFirestore(transaction: Transaction) {
        return {
            paymentDetails: {
                /* is the document id on 'transactions' collection*/
                orderId: transaction.paymentDetails.orderId,
                orderType: transaction.paymentDetails.orderType,
                branch: transaction.paymentDetails.branch,
                /*if ('paypal/cc')*/
                    payerId: transaction.paymentDetails.payerId,
                    paymentId: transaction.paymentDetails.paymentId,
                    billingToken: transaction.paymentDetails.paymentId,
                    facilitatorAccesstoken: transaction.paymentDetails.facilitatorAccesstoken,
                isPaid: transaction.paymentDetails.isPaid
            },
            cart: transaction.cart,
            metadata: {
                userid: transaction.metadata.userid,
                address: transaction.metadata.address,
                paymentMethod: transaction.metadata.paymentMethod,
                currentStatus: transaction.metadata.currentStatus,
                DeliDate: transaction.metadata.DeliDate,
                Notes: transaction.metadata.Notes
            }
        }
    }
} // export const sessionConverter: FirestoreDataConverter<Session>