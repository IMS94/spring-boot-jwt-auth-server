import {Alert, Button, Card, CardContent, CircularProgress, Container, Typography} from "@mui/material";
import styles from "./styles";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useMemo, useRef} from "react";
import {useAuth} from "../../auth";

const LoginView = () => {
  const {search} = useLocation();
  const navigate = useNavigate();
  const {progress, signInError, isAuthenticated, handleSignIn, signIn} = useAuth();
  const signInRef = useRef(false);

  const authCode = useMemo(() => {
    let searchParams = new URLSearchParams(search);
    return searchParams.get("code");
  }, []);

  useEffect(() => {
    if (!authCode) {
      return;
    }

    // A ref is used to prevent calling signin twice due to subsequent mounting in strict mode
    if (signInRef.current) {
      return;
    }
    signInRef.current = true;
    signIn(authCode).finally(() => signInRef.current = false);
  }, [authCode]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const handleLoginClick = () => {
    handleSignIn();
  }

  return (
    <Container
      maxWidth={false}
      sx={styles.root}
    >
      <Card sx={styles.loginCard}>
        <CardContent sx={styles.loginCardContent}>
          <Typography variant="h5">Welcome to Spring Boot Demo!</Typography>

          {progress && (
            <CircularProgress
              sx={{
                marginTop: (theme) => theme.spacing(3)
              }}
            />
          )}

          {!!signInError && (
            <Alert
              severity="error"
              sx={{
                marginTop: (theme) => theme.spacing(3)
              }}
            >
              {signInError}
            </Alert>
          )}

          <Button
            variant="contained"
            sx={{
              marginTop: (theme) => theme.spacing(3)
            }}
            onClick={handleLoginClick}
            disabled={progress}
          >
            Sign In
          </Button>
        </CardContent>
      </Card>
    </Container>
  )
};

export default LoginView;