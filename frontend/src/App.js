import './App.css';
import {Container, createTheme, ThemeProvider} from "@mui/material";
import {Route, Routes, useNavigate} from "react-router-dom";
import LoginView from "./views/Login";
import Home from "./views/Home";
import {useAuth} from "./auth";
import {useEffect} from "react";

const theme = createTheme({});

function App() {
  const navigate = useNavigate();
  const {isAuthenticated} = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{
          height: "100vh",
          backgroundColor: (theme) => theme.palette.grey[500]
        }}
        maxWidth={false}
        disableGutters
      >
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/login" element={<LoginView/>}/>
          <Route
            path="*"
            element={
              <div>
                Not Found!
              </div>
            }
          />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
