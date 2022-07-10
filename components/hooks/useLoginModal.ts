import create from 'zustand'

interface LoginModalState {
    loginModal: boolean;
    setLoginModal: (isActive: boolean) => void;
}

const useOrderModal = create<LoginModalState>((set) =>({
    loginModal: false,
    setLoginModal: (loginModal: boolean) => set(state => ({loginModal: !loginModal}))
}))

export default useOrderModal;