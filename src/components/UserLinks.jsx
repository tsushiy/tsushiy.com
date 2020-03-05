import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import config from "../../data/SiteConfig";

const useStyles = makeStyles({
  userLinks: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "100%"
  }
});

const UserLinks = props => {
  const classes = useStyles();

  const getLinkElements = () => {
    const { userLinks } = config;
    return userLinks.map(link => (
      <a href={link.url} key={link.label}>
        <IconButton type="button">
          <i className={link.iconClassName}></i>
        </IconButton>
      </a>
    ));
  };

  const { userLinks } = config;
  if (!userLinks) {
    return null;
  }
  return <div className={classes.userLinks}>{getLinkElements()}</div>;
};

export default UserLinks;
