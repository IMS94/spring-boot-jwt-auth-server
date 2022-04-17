import {Button, Card, CardContent, Container, Typography} from "@mui/material";
import styles from "./styles";

const LoginView = () => {

  return (
    <Container
      maxWidth={false}
      sx={styles.root}
    >
      <Card sx={styles.loginCard}>
        <CardContent sx={styles.loginCardContent}>
          <Typography variant="h5">Welcome to Spring Boot Demo!</Typography>
          <Button
            variant="contained"
            sx={{
              marginTop: (theme) => theme.spacing(3)
            }}
          >
            Sign In
          </Button>
        </CardContent>
      </Card>
    </Container>
  )
};

export default LoginView;