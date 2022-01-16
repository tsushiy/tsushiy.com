import React from "react";
import Helmet from "react-helmet";
import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material/styles';
import config from "../../data/SiteConfig";
import Navigation from "../components/Navigation";
import favicon from "../images/favicon.ico";
import "./index.css";
import "katex/dist/katex.min.css";
import "prismjs/themes/prism-tomorrow.css";

const theme = createTheme()
const useStyles = makeStyles({
  indexChildrenContainer: {
    margin: "1em auto",
    maxWidth: "880px"
  }
});

const MainLayout = props => {
  const classes = useStyles();
  const { children } = props;

  return (
    <>
      <Helmet>
        <meta name="description" content={config.siteDescription} />
        <html lang="ja" />
        <link rel="icon" href={favicon} />
        <link
          href="https://use.fontawesome.com/releases/v5.12.1/css/all.css"
          rel="stylesheet"
        />
      </Helmet>
      <Navigation />
      <Container className={classes.indexChildrenContainer}>
        {children}
      </Container>
    </>
  );
};

const AppWrapper = props => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <MainLayout {...props} />
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default AppWrapper;
