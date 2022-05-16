import React from "react"
import { Container, createStyles, Text } from "@mantine/core"

export default function Menu() {
    const useStyles = createStyles((theme) => ({
    }))
    const { classes } = useStyles();

    return(
        <div>
            <Container>
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus dictum porttitor. Donec sagittis neque dui, maximus consectetur arcu tincidunt id. Nam auctor sollicitudin dignissim. Phasellus condimentum odio id ex mattis facilisis. In fringilla et nisl ut dignissim. Cras quis dui elementum elit fermentum tempor. Vivamus rutrum sit amet ex et lacinia. Cras sit amet massa placerat turpis rhoncus condimentum sit amet nec arcu. Sed vehicula sapien sit amet lectus tincidunt, ac accumsan quam interdum.</Text>
            </Container>
        </div>
    )
}