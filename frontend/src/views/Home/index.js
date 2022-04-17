import Main from "../../layout/Main";
import {useEffect, useState} from "react";
import {listProducts} from "../../services";
import {Card, CardContent, CardHeader, Container, List, ListItem, ListItemText, Typography} from "@mui/material";
import {Product} from "../../types";

const Home = () => {
  const [products, setProducts]: [Product[], any] = useState([]);

  useEffect(() => {
    listProducts()
      .then((products) => {
        console.log("Products", products);
        setProducts(products);
      });
  }, [setProducts]);

  return (
    <Main>
      <Container
        maxWidth={false}
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
        disableGutters
      >
        <Card
          sx={{
            width: {
              lg: "30%",
              md: "40%",
              xs: "75%",
            },
            marginTop: (theme) => theme.spacing(5)
          }}
        >
          <CardHeader
            title={"Products"}
          />
          <CardContent>
            <List>
              {products.map((product: Product) => (
                <ListItem
                  key={product.id}
                  secondaryAction={
                    <>
                      <Typography variant="caption" display="inline">{product.currency}{' '}</Typography>
                      <Typography variant="h5" display="inline">{product.price}</Typography>
                    </>
                  }
                >
                  <ListItemText primary={product.name} secondary={product.description}/>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Container>
    </Main>
  )
};

export default Home;