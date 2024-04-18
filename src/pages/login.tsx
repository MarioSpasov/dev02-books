import { Card, CardContent } from "@mui/material";
import Layout from "../components/Layout";
import LogInForm from "../components/LoginForm";

function LoginPage() {
  return (
    <Layout authenticated={false}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <LogInForm />
        </CardContent>
      </Card>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8"></div>
    </Layout>
  );
}

export default LoginPage;
