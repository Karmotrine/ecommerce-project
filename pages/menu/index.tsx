import { Container, Text, Divider, createStyles, Center, Box, Drawer, SimpleGrid, Stack, Button} from "@mantine/core";

const useStyles = createStyles((theme) => ({
    headerFont: {
        fontSize: 60,
        fontWeight: 400,
    },
}))

export default function Menu() {
    const { classes } = useStyles()
    const [visible, setVisible] = useState(false);

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
                 borderRadius: theme.radius.md
      })}>
                <SimpleGrid cols={3}>
                <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                 <Image radius="md" src="https://doxo.com.ph/wp-content/uploads/2021/03/Maruzen-Ramen-R.png" alt="Box with name Maruzen Ramen" cursor: 'pointer','&:hover': {
                 backgroundColor:theme.colorScheme === 'light' ? theme.colors.white[2] : theme.colors.gray[5], 
                 {visible && <Overlay opacity={0.6} color="#000" zIndex={5}/>}, control = () => setVisible((v) => !v)}> Add to Cart
        }/>
                </div>
                    <List trigger ="hover" delay={500}> 
                        <Text weight={500}>Maruzen Ramen Kit</Text>
                        <Text> Each Maruzen Ramen Kit contains: </Text>
                        <List.Item> 300g Ramen Noodles Pasta </List.Item>
                        <List.Item> 150g Ramen Paste </List.Item>
                        <List.Item> Nori Sheets </List.Item>
                        <Text> ₱320.00 </Text>
                    </List>
                
                    
                    
                    
                <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                 <Image radius="md" src="https://doxo.com.ph/wp-content/uploads/2021/03/Fukouka-R.png" alt="Box with name Fukuoka Strong Taste" cursor: 'pointer','&:hover': {
                 backgroundColor:theme.colorScheme === 'light' ? theme.colors.white[2] : theme.colors.gray[5], 
                 {visible && <Overlay opacity={0.6} color="#000" zIndex={5}/>}, control = () => setVisible((v) => !v)}> Add to Cart
                </div>
                    <List trigger ="hover" delay={500}> 
                        <Text weight={500}>Fukuoka Strong Taste Ramen Kit</Text>
                        <Text> Each Fukuoka Strong Taste Ramen Kit contains: </Text>
                        <List.Item> Nori Sheets </List.Item>
                        <List.Item> Ramen Noodles </List.Item>
                        <List.Item> It is good for 6 to 8 servings too! </List.Item>
                        <List.Item> Add exciting toppings like chasu, egg, chili, etc! </List.Item>
                        <Text> ₱320.00 </Text>
                        </List>
                
                <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                 <Image radius="md" src="https://cdn11.bigcommerce.com/s-u7fvaz2rcv/images/stencil/500x659/products/112/547/Ramen_Kit_Front_View__44381.1654800649.jpg?c=1" alt="Box with name Tonkatsu Ramen" cursor: 'pointer','&:hover': {
                 backgroundColor:theme.colorScheme === 'light' ? theme.colors.white[2] : theme.colors.gray[5], 
                 {visible && <Overlay opacity={0.6} color="#000" zIndex={5}/>}, control = () => setVisible((v) => !v)}> Add to Cart
                </div>
                    <List trigger ="hover" delay={500}> 
                        <Text weight={500}>Tonkotsu Ramen Kit</Text>
                        <Text> Each Tonkotsu Ramen Kit contains: </Text>
                        <List.Item> 150g Ramen Paste </List.Item>
                        <List.Item> 300g Ramen Noodles </List.Item>
                        <List.Item> Nori Sheets </List.Item>
                        <Text> ₱320.00 </Text>
                    </List>
                    
                    </SimpleGrid>
                    </Box>
                
                
                    <Divider size="md" /> 
                    <Text weight={700}>BENTO</Text>
                    <Divider /> 
                
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
                
                <SimpleGrid cols={3}>
                    
              <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                 <Image radius="md" src="https://cdn.shopify.com/s/files/1/0425/6812/2520/products/bentomeal1_503x.jpg?v=1594638975" alt="Bento with Sakana Fry" cursor: 'pointer','&:hover': {
                 backgroundColor:theme.colorScheme === 'light' ? theme.colors.white[2] : theme.colors.gray[5], 
                 {visible && <Overlay opacity={0.6} color="#000" zIndex={5}/>}, control = () => setVisible((v) => !v)}> Add to Cart
                </div>
                    
                    
                    <List trigger ="hover" delay={500}> 
                        <Text weight={500}>Bento 1: Sakana Fry Kit</Text>
                        <Text> ₱295.00 </Text>
                    </List>
                
                <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                 <Image radius="md" src="https://cdn.shopify.com/s/files/1/0425/6812/2520/products/bentomeal4_503x.jpg?v=1594639136" alt="Bento with Yaki Tori" cursor: 'pointer','&:hover': {
                 backgroundColor:theme.colorScheme === 'light' ? theme.colors.white[2] : theme.colors.gray[5], 
                 {visible && <Overlay opacity={0.6} color="#000" zIndex={5}/>}, control = () => setVisible((v) => !v)}> Add to Cart
                </div>
                    
                    <List trigger ="hover" delay={500} control = {<Button> Add to Cart </Button>}> 
                        <Text weight={500}>Bento 2: Yaki Tori</Text>
                        <Text> ₱380.00 </Text>
                        
                    </List>
                
                <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                 <Image radius="md" src="https://cdn.shopify.com/s/files/1/0425/6812/2520/products/bentomeal3_503x.jpg?v=1594639115" alt="Bento with Tonkatsu" cursor: 'pointer','&:hover': {
                 backgroundColor:theme.colorScheme === 'light' ? theme.colors.white[2] : theme.colors.gray[5], 
                 {visible && <Overlay opacity={0.6} color="#000" zIndex={5}/>}, control = () => setVisible((v) => !v)}> Add to Cart
                     
                </div>
                    <List trigger ="hover" delay={500} control = {<Button> Add to Cart </Button>}> 
                        <Text weight={500}>Bento 3: Tonkatsu </Text>
                        <Text> ₱315.00 </Text>
                    </List>
                    
                    <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                 <Image radius="md" src="https://cdn.shopify.com/s/files/1/0425/6812/2520/products/bentomeal5_503x.jpg?v=1594639215" alt="Bento with Chicken Teriyaki" cursor: 'pointer','&:hover': {
                 backgroundColor:theme.colorScheme === 'light' ? theme.colors.white[2] : theme.colors.gray[5], 
                 {visible && <Overlay opacity={0.6} color="#000" zIndex={5}/>}, control = () => setVisible((v) => !v)}> Add to Cart
                     
                </div>
                    <List trigger ="hover" delay={500}> 
                        <Text weight={500}>Bento 4: Chicken Teriyaki </Text>
                        <Text> ₱380.00 </Text>
                    </List>
                    
                   <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                 <Image radius="md" src="https://cdn.shopify.com/s/files/1/0425/6812/2520/products/bentomeal8_503x.jpg?v=1596505544" alt="Bento Ebi Tempura" cursor: 'pointer','&:hover': {
                 backgroundColor:theme.colorScheme === 'light' ? theme.colors.white[2] : theme.colors.gray[5], 
                 {visible && <Overlay opacity={0.6} color="#000" zIndex={5}/>}, control = () => setVisible((v) => !v)}> Add to Cart
                     
                </div>
                    <List trigger ="hover" delay={500}> 
                        <Text weight={500}>Bento 5: Ebi Tempura </Text>
                        <Text> ₱400.00 </Text>
                    </List>
                    
                   <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                 <Image radius="md" src="https://cdn.shopify.com/s/files/1/0425/6812/2520/products/bentomeal9_503x.jpg?v=1594956859" alt="Bento with Hirenku" cursor: 'pointer','&:hover': {
                 backgroundColor:theme.colorScheme === 'light' ? theme.colors.white[2] : theme.colors.gray[5], 
                 {visible && <Overlay opacity={0.6} color="#000" zIndex={5}/>}, control = () => setVisible((v) => !v)}> Add to Cart
                     
                </div>
                    <List trigger ="hover" delay={500} control = {<Button> Add to Cart </Button>}> 
                        <Text weight={500}>Bento 6: Gyu Hirenku </Text>
                        <Text> ₱610.00 </Text>
                    </List>
                    
                    </SimpleGrid>
                    </Box>
                    
                        
                    
                    <Divider size="md" /> 
                    <Text weight={700}>EXTRA AND DRINKS</Text>
                    <Divider /> 
                        
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
                
                <Stack sx={(theme) => ({ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0], height: 300 })}>    
                <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                 <Image radius="md" src="https://assets.bonappetit.com/photos/57aca9caf1c801a1038bc6aa/1:1/w_3731,h_3731,c_limit/cold-brew-plum-iced-tea.jpg" alt="Glass with Ice tea" cursor: 'pointer','&:hover': {
                 backgroundColor:theme.colorScheme === 'light' ? theme.colors.white[2] : theme.colors.gray[5], 
                 {visible && <Overlay opacity={0.6} color="#000" zIndex={5}/>}, control = () => setVisible((v) => !v)}> Add to Cart
                     
                </div>
                    <List trigger ="hover" delay={500}> 
                        <Text weight={500}> Ice Tea </Text>
                        <List.Item> Regular </List.Item>
                        <List.Item> Large </List.Item>
                        <Text> ₱20.00 </Text>
                    </List>
                
               <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                 <Image radius="md" src="https://gimmedelicious.com/wp-content/uploads/2018/03/Iced-Matcha-Latte2.jpg" alt="Glass with matcha" cursor: 'pointer','&:hover': {
                 backgroundColor:theme.colorScheme === 'light' ? theme.colors.white[2] : theme.colors.gray[5], 
                 {visible && <Overlay opacity={0.6} color="#000" zIndex={5}/>}, control = () => setVisible((v) => !v)}> Add to Cart
                     
                </div>
                    <List trigger ="hover" delay={500}> 
                        <Text weight={500}> Matcha </Text>
                        <List.Item> Regular </List.Item>
                        <List.Item> Large </List.Item>
                        <Text> ₱100.00 </Text>
                        
                    </List>
                
               <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                 <Image radius="md" src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/nutella-iced-coffee-4-1625659566.jpg?crop=0.868xw:0.540xh;0.0459xw,0.256xh&resize=640:*" alt="Glass of Ice Coffee with Straw" cursor: 'pointer','&:hover': {
                 backgroundColor:theme.colorScheme === 'light' ? theme.colors.white[2] : theme.colors.gray[5], 
                 {visible && <Overlay opacity={0.6} color="#000" zIndex={5}/>}, control = () => setVisible((v) => !v)}> Add to Cart
                     
                </div>
                    <List trigger ="hover" delay={500}> 
                        <Text weight={500}> Ice Coffee </Text>
                        <List.Item> Regular </List.Item>
                        <List.Item> Large </List.Item>
                        <Text> ₱30.00 </Text>
                    </List>
                    
                   <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                 <Image radius="md" src="https://media.istockphoto.com/photos/refreshing-hot-cup-of-coffee-at-a-cafe-picture-id1358132613?b=1&k=20&m=1358132613&s=170667a&w=0&h=4lxHOZRkfubPw4Y4MKHrk-v7R2ZUrK4KBVtvdJrPtU4=" alt="Small Mug full of coffee" cursor: 'pointer','&:hover': {
                 backgroundColor:theme.colorScheme === 'light' ? theme.colors.white[2] : theme.colors.gray[5], 
                 {visible && <Overlay opacity={0.6} color="#000" zIndex={5}/>}, control = () => setVisible((v) => !v)}> Add to Cart
                     
                </div>
                    <List trigger ="hover" delay={500}> 
                        <Text weight={500}> Hot Coffee </Text>
                        <List.Item> Regular </List.Item>
                        <List.Item> Large </List.Item>
                        <Text> ₱20.00 </Text>
                    </List>
                    
                    <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                 <Image radius="md" src="https://media.istockphoto.com/photos/soft-drink-picture-id968834938?k=20&m=968834938&s=612x612&w=0&h=TLQyvArFMIlX9NeOPjcRK0P3_oReNzOqQCysbH00a2Y=" alt="Glass of Coke" cursor: 'pointer','&:hover': {
                 backgroundColor:theme.colorScheme === 'light' ? theme.colors.white[2] : theme.colors.gray[5], 
                 {visible && <Overlay opacity={0.6} color="#000" zIndex={5}/>}, control = () => setVisible((v) => !v)}> Add to Cart
                     
                </div>
                    <List trigger ="hover" delay={500}> 
                        <Text weight={500}> Coke </Text>
                        <List.Item> Regular </List.Item>
                        <List.Item> Large </List.Item>
                        <Text> ₱20.00 </Text>
                    </List>
                    
                    <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                 <Image radius="md" src="https://cdn2.foodviva.com/static-content/food-images/pineapple-recipes/pineapple-juice-recipe/pineapple-juice-recipe.jpg" alt="Glass of Pineapple juice with straw" cursor: 'pointer','&:hover': {
                 backgroundColor:theme.colorScheme === 'light' ? theme.colors.white[2] : theme.colors.gray[5], 
                 {visible && <Overlay opacity={0.6} color="#000" zIndex={5}/>}, control = () => setVisible((v) => !v)}> Add to Cart
                     
                </div>
                    <List trigger ="hover" delay={500}> 
                        <Text weight={500}> Pineapple Juice </Text>
                        <List.Item> Regular </List.Item>
                        <List.Item> Large </List.Item>
                        <Text> ₱50.00 </Text>
                    </List>
                    
                  <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                 <Image radius="md" src="https://www.ikea.com/ph/en/images/products/trebent-chopsticks-4-pairs-bamboo__0713331_pe729440_s5.jpg?f=s" alt="4 different pairs of chopsticks" cursor: 'pointer','&:hover': {
                 backgroundColor:theme.colorScheme === 'light' ? theme.colors.white[2] : theme.colors.gray[5], 
                 {visible && <Overlay opacity={0.6} color="#000" zIndex={5}/>}, control = () => setVisible((v) => !v)}> Add to Cart
                     
                </div>
                    <List trigger ="hover" delay={500}> 
                        <Text weight={500}> Chopsticks </Text>
                        <Text> ₱15.00 </Text>
                    </List>
                
                    <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                 <Image radius="md" src="https://image.made-in-china.com/202f0j00TEwRkbIaOYcJ/to-Go-Disposable-Kraft-Paper-Bowls-Biodegradable-Compostable-Salad-Bowl.jpg" alt="2 take away paper bowls" cursor: 'pointer','&:hover': {
                 backgroundColor:theme.colorScheme === 'light' ? theme.colors.white[2] : theme.colors.gray[5], 
                 {visible && <Overlay opacity={0.6} color="#000" zIndex={5}/>}, control = () => setVisible((v) => !v)}> Add to Cart
                     
                </div>
                    <List trigger ="hover" delay={500}> 
                        <Text weight={500}> Extra Bowl </Text>
                        <Text> ₱15.00 </Text>
                    </List>
                    
                  <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                 <Image radius="md" src="https://selecthealth.org/-/media/selecthealth/blogs/post/2020/05/miso_soup_blog_lg.ashx" alt="A Miso Soup" cursor: 'pointer','&:hover': {
                 backgroundColor:theme.colorScheme === 'light' ? theme.colors.white[2] : theme.colors.gray[5], 
                 {visible && <Overlay opacity={0.6} color="#000" zIndex={5}/>}, control = () => setVisible((v) => !v)}> Add to Cart
                     
                </div>
                    <List trigger ="hover" delay={500}> 
                        <Text weight={500}> Miso Soup </Text>
                        <Text> ₱250.00 </Text>
                    </List>
                    
                    </Stack>
                    </Box> 
                    
                    
            </Container> 
        </>
    )
}
