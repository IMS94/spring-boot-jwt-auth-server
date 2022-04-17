import Main from "../../layout/Main";
import {useEffect, useState} from "react";
import {listProducts} from "../../services";
import {Card, Container} from "@mui/material";

const Home = () => {
  const [products, setProducts] = useState([]);

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
        maxWidth="sm"
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center"
        }}
      >
        <Card>

        </Card>
      </Container>
    </Main>
  )
};

export default Home;