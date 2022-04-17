import './App.css';
import {Container, createTheme, ThemeProvider} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginView from "./views/Login";
import Home from "./views/Home";
import {AuthProvider} from "./auth";

const theme = createTheme({});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
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
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
