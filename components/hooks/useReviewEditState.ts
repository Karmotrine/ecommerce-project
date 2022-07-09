import create from 'zustand'

interface ReviewEditState {
    edit: boolean;
    setEdit: (isActive: boolean) => void;
}

const useReviewEditState = create<ReviewEditState>((set) =>({
    edit: false,
    setEdit: (edit: boolean) => set(state => ({edit: !edit}))
}))

export default useReviewEditState;