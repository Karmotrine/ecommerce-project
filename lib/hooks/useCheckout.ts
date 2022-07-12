import { useCallback, useState } from "react"
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore"
// find way to reroute in nextjs

import { collections } from "../firebaseClient"
import { useUser } from "./useUser"
import { Transaction } from "../types"
/*
export function useCheckout(): {
    
    trigger: (session: Omit<Session, 'url' | 'customer'>) => void
    loading: boolean
    error: Error | null
} {
    
} // export function useCheckout(): {...}
*/