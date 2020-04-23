import React from "react";
import Helmet from "react-helmet";
import { Container } from "@material-ui/core";
import Layout from "../layout";
import SEO from "../components/SEO";
import Footer from "../components/Footer";
import config from "../../data/SiteConfig";

const NotFoundPage = () => {
  return (
    <Layout>
      <SEO />
      <Container maxWidth="md">
        <Helmet title={`Page not found – ${config.siteTitle}`} />
        <h1>404 Not Found.</h1>
      </Container>
      <Footer />
    </Layout>
  );
};

export default NotFoundPage;
