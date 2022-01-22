import React from "react";
import type { FC } from 'react';
import Helmet from "react-helmet";
import { Container } from "@mui/material";
import { styled } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material/styles';
import config from "../../data/SiteConfig";
import Navigation from "../components/Navigation";
import favicon from "../images/favicon.ico";
import "./index.css";
import "katex/dist/katex.min.css";
import "prismjs/themes/prism-tomorrow.css";

const theme = createTheme({
  palette: {
    primary: {
      main: '#5C6070',
      contrastText: '#fff',
    },
  },
})
const IndexChildrenContainer = styled(Container)({
  margin: "1em auto"
});

const MainLayout: FC = ({ children }) => {
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
      <IndexChildrenContainer maxWidth="md">
        {children}
      </IndexChildrenContainer>
    </>
  );
};

const AppWrapper: FC = (props) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <MainLayout {...props} />
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default AppWrapper;
