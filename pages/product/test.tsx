import { useOrderFormDetail } from "../../components/hooks/useOrderFormDetail";
import { useAddresses } from "../../lib/hooks/useAdresses";
import { Text } from "@mantine/core";
export default function Test() {
    const { savedAddress, savedDeliDate, savedDeliTime, savedNotes } = useOrderFormDetail()
    return(
        <>
            Testing page
        </>
    )
}