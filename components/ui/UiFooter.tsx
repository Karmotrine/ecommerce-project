import { Footer, Text, Container, Divider, SimpleGrid, Group, Center } from "@mantine/core"

export default function UiFooter() {
    return (
        <Footer
            height={300}
        >
            <div>
                <Group grow>
                    <div>
                    <Text>Store Hours</Text>
                    <Divider/>
                    </div>
                    <div>
                    <Text>Contact</Text>
                    <Divider/>
                    </div>
                    <div>
                    <Text>Socials</Text>
                    <Divider/>
                    </div>
                    <div>
                    <Text>About us</Text>
                    <Divider/>
                    </div>
                </Group>
            </div>
        </Footer>
    )
}