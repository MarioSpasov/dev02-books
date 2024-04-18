import { useRouter } from "next/router";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Layout from "../components/Layout";
import { redirectToLogIn, redirectToRegister } from "../hooks/useRedirect";

function HomePage() {
  const router = useRouter();

  const redirectLogIn = redirectToLogIn(router);
  const redirectRegister = redirectToRegister(router);

  return (
    <Layout homepage={true}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.firstly" gutterBottom>
            Welcome to our app!
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            To proceed please log in or register.
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={redirectLogIn} size="small">
            Log in
          </Button>
          <Button onClick={redirectRegister} size="small">
            Register
          </Button>
        </CardActions>
      </Card>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8"></div>
    </Layout>
  );
}

export default HomePage;
