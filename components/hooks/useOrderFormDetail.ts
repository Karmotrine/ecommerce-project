import create from 'zustand'
import { Address } from '../../lib/types';

interface OrderFormDetailState {
    savedAddress: Address | null
    savedDeliDate: Date | null
    savedDeliTime: Date | null
    savedNotes: string
    setOrderFormDetail: (tAddress: Address, tDeliDate: Date, tDeliTime: Date, tNotes: string) => void;
}

export const useOrderFormDetail = create<OrderFormDetailState>((set) => ({
    savedAddress: null,
    savedDeliDate: null,
    savedDeliTime: null,
    savedNotes: "",
    setOrderFormDetail: (tAddress: Address, tDeliDate: Date, tDeliTime: Date, tNotes: string) => (
        set(state => ({savedAddress: tAddress, savedDeliDate: tDeliDate, savedDeliTime: tDeliTime, savedNotes: tNotes}))
    )
}))