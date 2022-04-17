import React from "react";
import {AppBar, Button, Container, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import {useAuth} from "../auth";

const Main = ({children}) => {
  const {signOut, isAuthenticated} = useAuth();

  return (
    <Container
      sx={{
        height: "100%"
      }}
      maxWidth={false}
      disableGutters
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            Spring Boot Demo
          </Typography>
          {isAuthenticated && <Button color={"inherit"} onClick={signOut}>Logout</Button>}
          {!isAuthenticated && <Button color={"inherit"} component={NavLink} to={"/login"}>Login</Button>}
        </Toolbar>
      </AppBar>
      {children}
    </Container>
  )
}

export default Main;
