import { useOrderFormDetail } from "../../components/hooks/useOrderFormDetail";
import { useAddresses } from "../../lib/hooks/useAdresses";
export default function Test() {
    const { savedAddress, savedDeliDate, savedDeliTime, savedNotes } = useOrderFormDetail()
    const {getAddress} = useAddresses()
    const testFindAddress = getAddress("663fcaf5-6304-4d31-bf95-d927f2754419")
    return(
        <>
            {/*{[savedAddress, savedDeliDate, savedDeliTime, savedNotes].map((x,i) => <p key={i}>{x}</p>)}*/}
            <p>{testFindAddress?.nameId}</p>
        </>
    )
}