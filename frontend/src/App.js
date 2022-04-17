import './App.css';
import {Container, createTheme, ThemeProvider} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginView from "./views/Login";
import LandingPage from "./views/LandingPage";

const theme = createTheme({});

function App() {
  return (
    <BrowserRouter>
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
            <Route index element={<LandingPage/>}/>
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
    </BrowserRouter>
  );
}

export default App;
