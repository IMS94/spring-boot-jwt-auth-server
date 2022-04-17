import React from "react";
import {AppBar, Button, Container, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";

const Main = ({children}) => {
  return (
    <Container maxWidth={false} disableGutters>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Spring Boot Demo
          </Typography>
          <Button color={"inherit"} component={NavLink} to={"/login"}>Login</Button>
        </Toolbar>
      </AppBar>
      {children}
    </Container>
  )
}

export default Main;
