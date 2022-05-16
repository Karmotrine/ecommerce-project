import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth";
import { getFirestore, collection, CollectionReference } from "firebase/firestore";
import { getStorage } from "firebase/storage"
import { getFunctions } from "firebase/functions";

import { Session, Review } from "./types"
import {
    productConverter,
    customerConverter,
    sessionConverter,
    reviewConverter,
    contentConverter,
    addressConverter
} from "./converters"

/**
 *  Integrate 'transactions' collections (Google pay payments)
 */

const clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY.trim(),
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN.trim(),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID.trim(),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET.trim(),
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID.trim(),
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID.trim(),
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID.trim(),
}

export const app = initializeApp(clientCredentials)
export const firestore = getFirestore(app)
export const storage = getStorage(app)
export const functions = getFunctions(app)
export const auth = getAuth(app)

let analytics
if(clientCredentials?.projectId) {
    if (app.name && typeof window !== 'undefined') {
        analytics = getAnalytics(app)
    }
}
export { analytics }


export const collections = {
    products: collection(firestore, 'products').withConverter(productConverter),
    customers: collection(firestore, 'customers').withConverter(customerConverter),
    cart: collection(firestore, 'cart'),
    sessions: (customerId: string): CollectionReference<Session> =>
        collection(firestore, 'customers', customerId, 'checkout_sessions').withConverter(sessionConverter),
    payments: (customerId: string): CollectionReference => 
        collection(firestore, 'customers', customerId, 'payments'),
    productReviews: (productId: string ): CollectionReference<Review> =>
        collection(firestore, 'products', productId, 'reviews').withConverter(reviewConverter),
    content: collection(firestore, 'content').withConverter(contentConverter),
    addresses: (customerId: string) =>
        collection(firestore, 'customers', customerId, 'addresses').withConverter(addressConverter),
}
