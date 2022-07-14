import { useAddresses } from "../../lib/hooks/useAdresses";
import { Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import superjson from "superjson"

export default function Test() {
    const [details] =  useLocalStorage({
            key: "orderExDetails",
            defaultValue: {
                savedAddress: null,
                savedDeliDateTime: null,
                savedNotes: null
            }, serialize: superjson.stringify,
        deserialize: (str) => (str === undefined ?
            {
                savedAddress: null,
                savedDeliDateTime: null,
                savedNotes: null
            } : superjson.parse(str)),
        }
    )
    console.log(details.savedAddress)
    console.log(details.savedDeliDateTime)
    console.log(details.savedNotes)
    return(
        <>
            <p>test</p>
        </>
    )
}