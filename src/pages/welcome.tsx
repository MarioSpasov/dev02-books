import { Card, CardContent } from "@mui/material";
import Layout from "../components/Layout";
import WelcomeComponent from "../components/WelcomeComponent";

function WelcomePage() {
  return (
    <Layout homepage={true}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <WelcomeComponent />
        </CardContent>
      </Card>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8"></div>
    </Layout>
  );
}

export default WelcomePage;
