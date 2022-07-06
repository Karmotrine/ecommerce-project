import create from 'zustand'

interface OrderModalState {
    isActive: boolean;
    setOrderActive: (isActive: boolean) => void;
}

const useOrderModal = create<OrderModalState>((set) =>({
    isActive: false,
    setOrderActive: (isActive: boolean) => set(state => ({isActive: !isActive}))
}))

export default useOrderModal;