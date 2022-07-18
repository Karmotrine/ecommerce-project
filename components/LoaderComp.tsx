import { Center, Loader } from "@mantine/core";

export default function LoaderComp() {
    return (
        <>
            <Center py={270}>
                <Loader color="red" size="lg"/>
            </Center>
        </>
    )
}