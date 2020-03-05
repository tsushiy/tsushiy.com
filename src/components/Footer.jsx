import React from "react";
import { Link } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import config from "../../data/SiteConfig";

const useStyles = makeStyles({
  footer: {
    justifyContent: "center",
    alignContent: "center",
    padding: "10px 5px 5px"
  },
  noticeContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginTop: "25px"
  }
});

const Footer = props => {
  const classes = useStyles();
  const url = config.siteRss;
  const { copyright } = config;
  if (!copyright) {
    return null;
  }

  return (
    <footer className={classes.footer}>
      <div className={classes.noticeContainer}>
        <h4>{copyright}</h4>・
        <a
          href="https://tsushiy.com/rss.xml"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#444" }}
        >
          <i className="fas fa-rss"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
