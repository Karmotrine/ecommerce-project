import { useOrderFormDetail } from "../../components/hooks/useOrderFormDetail";
export default function Test() {
    const { savedAddress, savedDeliDate, savedDeliTime, savedNotes } = useOrderFormDetail()
    return(
        <>
            {[savedAddress, savedDeliDate, savedDeliTime, savedNotes].map((x,i) => <p key={i}>{x}</p>)}
        </>
    )
}