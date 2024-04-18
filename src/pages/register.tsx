import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Layout from "../components/Layout";

import RegisterForm from "../components/RegisterForm";

function RegisterPage() {
  return (
    <Layout authenticated={false}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8"></div>
    </Layout>
  );
}

export default RegisterPage;
