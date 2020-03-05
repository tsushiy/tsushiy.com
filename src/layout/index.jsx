import React from "react";
import Helmet from "react-helmet";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import config from "../../data/SiteConfig";
import Navigation from "../components/Navigation";
import favicon from "../images/favicon.ico";
import "./index.css";
import "katex/dist/katex.min.css";
import "prismjs/themes/prism-tomorrow.css";

const useStyles = makeStyles({
  indexContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Hiragino Sans", "Noto Sans CJK JP", "Original Yu Gothic", "Yu Gothic", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Sans Emoji"'
  },
  indexChildrenContainer: {
    margin: "1em auto",
    maxWidth: "880px"
  }
});

const MainLayout = props => {
  const classes = useStyles();
  const { children } = props;

  return (
    <div className={classes.indexContainer}>
      <Helmet>
        <meta name="description" content={config.siteDescription} />
        <link rel="icon" href={favicon} />
        <link
          href="https://use.fontawesome.com/releases/v5.12.1/css/all.css"
          rel="stylesheet"
        ></link>
      </Helmet>
      <Navigation />
      <Container className={classes.indexChildrenContainer}>{children}</Container>
    </div>
  );
};

export default MainLayout;
