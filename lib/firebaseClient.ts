import { getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth";
import { getFirestore, collection, CollectionReference } from "firebase/firestore";
import { getStorage } from "firebase/storage"
import { getFunctions } from "firebase/functions";

import { Transaction, Review } from "./types"
import {
    productConverter,
    transactionConverter,
    reviewConverter,
    contentConverter,
    addressConverter
} from "./converters"

/**
 *  Integrate 'transactions' collections (Google pay payments)
 * https://www.coffeeclass.io/articles/add-firebase-to-nextjs
 */

const clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
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
    cart: collection(firestore, 'cart'),
    transactions: (): CollectionReference<Transaction> => 
        collection(firestore, 'transaction').withConverter(transactionConverter),
    productReviews: (productId: string ): CollectionReference<Review> =>
        collection(firestore, 'products', productId, 'reviews').withConverter(reviewConverter),
    content: collection(firestore, 'content').withConverter(contentConverter),
    addresses: (customerId: string) =>
        collection(firestore, 'customers', customerId, 'addresses').withConverter(addressConverter),
}
