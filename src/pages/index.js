import { Box, Container, Typography } from "@mui/material";
import { Amplify } from "aws-amplify";
import { TailSpin } from "react-loader-spinner";
import awsconfig from "../aws-exports";
import Layout from "../component/Layout";
import useHome from "../features/courses/hooks/useHome";
import FeaturedSection from "../features/home/component/FeaturedSection";
import { Spinner } from "../styles/Course.module";
import Head from "next/head";
import { Helmet } from "react-helmet";

// Function to dynamically configure awsconfig
const configureAWS = () => {
  const config = {
    ...awsconfig,
  };

  if (process.env.NEXT_APP_ENVIRONMENT === "Production") {
    config.aws_user_pools_id = process.env.NEXT_APP_PROD_USER_POOL_ID;
    config.aws_user_pools_web_client_id =
      process.env.NEXT_APP_PROD_WEB_CLIENT_ID;
    config.aws_cognito_identity_pool_id =
      process.env.NEXT_APP_PROD_IDENTITY_POOL_ID;
    config.oauth.domain =
      "skillhuntwebf28a2ec5-f28a2ec5-prod.auth.ap-south-1.amazoncognito.com";
  }
  return config;
};

Amplify.configure(configureAWS());

export default function Home() {
  const [home, isLoading] = useHome();

  const displayResult = () => {
    return (
      <Layout>
        <Box>
          <Head>
          <meta property="og:image" content="https://example.com/ogp.jpg" />
          <meta
            property="og:image:secure_url"
            content="https://secure.example.com/ogp.jpg"
          />
          <meta property="og:image:type" content="image/jpeg" />
          <meta property="og:image:width" content="400" />
          <meta property="og:image:height" content="300" />
          <meta
            property="og:image:alt"
            content="A shiny red apple with a bite taken out"
          />
          </Head>
          {home.map((homeItem) => (
            <Container key={homeItem.key} sx={{ mb: 8 }}>
              <Typography component="span" variant="h5" gutterBottom>
                {homeItem.desc}
              </Typography>
              <Box>
                <FeaturedSection section={homeItem} />
              </Box>
            </Container>
          ))}
        </Box>
      </Layout>
    );
  };

  const loadSpinner = () => {
    return (
      <Spinner>
        <TailSpin />
      </Spinner>
    );
  };

  return (
    <Typography component="span">
      {isLoading ? loadSpinner() : displayResult()}
    </Typography>
  );
}
