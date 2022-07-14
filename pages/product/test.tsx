import { useAddresses } from "../../lib/hooks/useAdresses";
import { Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import superjson from "superjson"

export default function Test() {
    const [details] =  useLocalStorage({
            key: "orderExDetails",
            defaultValue: {
                savedAddress: null,
                savedDeliDate: null,
                savedDeliTime: null,
                savedNotes: null
            }, serialize: superjson.stringify,
        deserialize: (str) => (str === undefined ?
            {
                savedAddress: null,
                savedDeliDate: null,
                savedDeliTime: null,
                savedNotes: null
            } : superjson.parse(str)),
        }
    )
    console.log(details.savedAddress)
    console.log(details.savedDeliDate)
    console.log(details.savedDeliTime)
    console.log(details.savedNotes)
    return(
        <>
            <p>test</p>
        </>
    )
}