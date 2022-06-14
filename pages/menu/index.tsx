import { Container, Text, Divider, createStyles, Center, Box} from "@mantine/core";

const useStyles = createStyles((theme) => ({
    headerFont: {
        fontSize: 60,
        fontWeight: 400,
    },
}))

export default function Menu() {
    const { classes } = useStyles()
    return(
        <>
            <Container py={48}>
                <Center>
                    <Text className={classes.headerFont}>Menu</Text>
                </Center>
                <Divider />
                
                <Text weight={700}>RAMEN KITS</Text>
                
                <Box sx={(theme) => ({
                 backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                 textAlign: 'left',
                 padding: theme.spacing.xl,
                 borderRadius: theme.radius.md,
                 cursor: 'pointer','&:hover': {
                 backgroundColor:
            theme.colorScheme === 'light' ? theme.colors.white[2] : theme.colors.gray[5],
        },
      })}>
                
                <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                 <Image radius="md" src="" alt="Box with Chopsticks"/>
                </div>
                    <list.Item trigger ="hover" delay={500} control = {<Button> Add to Cart </Button>}> 
                        <Text weight={500}>Maruzen Ramen Kit</Text>
                        <Text> Each Maruzen Ramen Kit contains: </Text>
                        <List.Item> 300g Ramen Noodles Pasta </List.Item>
                        <List.Item> 150g Ramen Paste </List.Item>
                        <List.Item> Nori Sheets </List.Item>
                        <Text> ₱320.00 </Text>
                    </List.Item>
                
                <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                 <Image radius="md" src="" alt="Box with Chopsticks"/>
                </div>
                    <list.Item trigger ="hover" delay={500} control = {<Button> Add to Cart </Button>}> 
                        <Text weight={500}>Fukuoka Strong Taste Ramen Kit</Text>
                        <Text> Each Fukuoka Strong Taste Ramen Kit contains: </Text>
                        <List.Item> Nori Sheets </List.Item>
                        <List.Item> Ramen Noodles </List.Item>
                        <List.Item> It is good for 6 to 8 servings too! </List.Item>
                        <List.Item> Add exciting toppings like chasu, egg, chili, etc! </List.Item>
                        <Text> ₱320.00 </Text>
                    </List.Item>
                
                <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                 <Image radius="md" src="" alt="Box with Chopsticks"/>
                </div>
                    <list.Item trigger ="hover" delay={500} control = {<Button> Add to Cart </Button>}> 
                        <Text weight={500}>Tonkotsu Ramen Kit</Text>
                        <Text> Each Tonkotsu Ramen Kit contains: </Text>
                        <List.Item> 150g Ramen Paste </List.Item>
                        <List.Item> 300g Ramen Noodles </List.Item>
                        <List.Item> Nori Sheets </List.Item>
                        <Text> ₱320.00 </Text>
                    </List.Item>
                    
                    
                    </Box>   
                    <Divider /> 
                    <Text weight={700}>BENTO</Text>
                
                <Box sx={(theme) => ({
                 backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                 textAlign: 'right',
                 padding: theme.spacing.xl,
                 borderRadius: theme.radius.md,
                 cursor: 'pointer','&:hover': {
                 backgroundColor:
            theme.colorScheme === 'light' ? theme.colors.white[2] : theme.colors.gray[5],
        },
      })}>
                
                <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                 <Image radius="md" src="" alt="Box with Chopsticks"/>
                </div>
                    <list.Item trigger ="hover" delay={500} control = {<Button> Add to Cart </Button>}> 
                        <Text weight={500}>Bento 1: Sakana Fry Kit</Text>
                        <Text> ₱295.00 </Text>
                    </List.Item>
                
                <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                 <Image radius="md" src="" alt="Box with Chopsticks"/>
                </div>
                    <list.Item trigger ="hover" delay={500} control = {<Button> Add to Cart </Button>}> 
                        <Text weight={500}>Bento 2: Yaki Tori</Text>
                        <Text> ₱380.00 </Text>
                        
                    </List.Item>
                
                <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                 <Image radius="md" src="" alt="Box with Chopsticks"/>
                </div>
                    <list.Item trigger ="hover" delay={500} control = {<Button> Add to Cart </Button>}> 
                        <Text weight={500}>Bento 3: Tonkatsu </Text>
                        <Text> ₱315.00 </Text>
                    </List.Item>
                    
                    <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                 <Image radius="md" src="" alt="Box with Chopsticks"/>
                </div>
                    <list.Item trigger ="hover" delay={500} control = {<Button> Add to Cart </Button>}> 
                        <Text weight={500}>Bento 4: Chicken Teriyaki </Text>
                        <Text> ₱380.00 </Text>
                    </List.Item>
                    
                    <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                 <Image radius="md" src="" alt="Box with Chopsticks"/>
                </div>
                    <list.Item trigger ="hover" delay={500} control = {<Button> Add to Cart </Button>}> 
                        <Text weight={500}>Bento 5: Ebi Tempura </Text>
                        <Text> ₱400.00 </Text>
                    </List.Item>
                    
                    <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                 <Image radius="md" src="" alt="Box with Chopsticks"/>
                </div>
                    <list.Item trigger ="hover" delay={500} control = {<Button> Add to Cart </Button>}> 
                        <Text weight={500}>Bento 6: Gyu Hirenku </Text>
                        <Text> ₱610.00 </Text>
                    </List.Item>
                    
                    
                    </Box>
                    <Divider /> 
                    <Text weight={700}>EXTRA AND DRINKS</Text>
                
                <Box sx={(theme) => ({
                 backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                 textAlign: 'center',
                 padding: theme.spacing.xl,
                 borderRadius: theme.radius.md,
                 cursor: 'pointer','&:hover': {
                 backgroundColor:
            theme.colorScheme === 'light' ? theme.colors.white[2] : theme.colors.gray[5],
        },
      })}>
                
                <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                 <Image radius="md" src="" alt="Box with Chopsticks"/>
                </div>
                    <list.Item trigger ="hover" delay={500} control = {<Button> Add to Cart </Button>}> 
                        <Text weight={500}> Ice Tea </Text>
                        <List.Item> Regular </List.Item>
                        <List.Item> Large </List.Item>
                        <Text> ₱20.00 </Text>
                    </List.Item>
                
                <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                 <Image radius="md" src="" alt="Box with Chopsticks"/>
                </div>
                    <list.Item trigger ="hover" delay={500} control = {<Button> Add to Cart </Button>}> 
                        <Text weight={500}> Matcha </Text>
                        <List.Item> Regular </List.Item>
                        <List.Item> Large </List.Item>
                        <Text> ₱100.00 </Text>
                        
                    </List.Item>
                
                <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                 <Image radius="md" src="" alt="Box with Chopsticks"/>
                </div>
                    <list.Item trigger ="hover" delay={500} control = {<Button> Add to Cart </Button>}> 
                        <Text weight={500}> Ice Coffee </Text>
                        <List.Item> Regular </List.Item>
                        <List.Item> Large </List.Item>
                        <Text> ₱30.00 </Text>
                    </List.Item>
                    
                    <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                 <Image radius="md" src="" alt="Box with Chopsticks"/>
                </div>
                    <list.Item trigger ="hover" delay={500} control = {<Button> Add to Cart </Button>}> 
                        <Text weight={500}> Hot Coffee </Text>
                        <List.Item> Regular </List.Item>
                        <List.Item> Large </List.Item>
                        <Text> ₱20.00 </Text>
                    </List.Item>
                    
                    <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                 <Image radius="md" src="" alt="Box with Chopsticks"/>
                </div>
                    <list.Item trigger ="hover" delay={500} control = {<Button> Add to Cart </Button>}> 
                        <Text weight={500}> Coke </Text>
                        <List.Item> Regular </List.Item>
                        <List.Item> Large </List.Item>
                        <Text> ₱20.00 </Text>
                    </List.Item>
                    
                    <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                 <Image radius="md" src="" alt="Box with Chopsticks"/>
                </div>
                    <list.Item trigger ="hover" delay={500} control = {<Button> Add to Cart </Button>}> 
                        <Text weight={500}> Pineapple Juice </Text>
                        <List.Item> Regular </List.Item>
                        <List.Item> Large </List.Item>
                        <Text> ₱50.00 </Text>
                    </List.Item>
                    
                    <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                 <Image radius="md" src="" alt="Box with Chopsticks"/>
                </div>
                    <list.Item trigger ="hover" delay={500} control = {<Button> Add to Cart </Button>}> 
                        <Text weight={500}> Chopsticks </Text>
                        <Text> ₱15.00 </Text>
                    </List.Item>
                
                    <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                 <Image radius="md" src="" alt="Box with Chopsticks"/>
                </div>
                    <list.Item trigger ="hover" delay={500} control = {<Button> Add to Cart </Button>}> 
                        <Text weight={500}> Extra Bowl </Text>
                        <Text> ₱15.00 </Text>
                    </List.Item>
                    
                    <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                 <Image radius="md" src="" alt="Box with Chopsticks"/>
                </div>
                    <list.Item trigger ="hover" delay={500} control = {<Button> Add to Cart </Button>}> 
                        <Text weight={500}> Miso Soup </Text>
                        <Text> ₱250.00 </Text>
                    </List.Item>
                    </Box> 
            </Container> 
        </>
    )
}
