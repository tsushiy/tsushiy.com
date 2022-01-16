import React from "react";
import { Link } from "gatsby";
import { makeStyles } from "@mui/styles";
import { AppBar, Toolbar, Button } from "@mui/material";
import NavLinks from "../../data/NavLinks";
import UserLinks from "./UserLinks";

const useStyles = makeStyles({
  navBar: {
    backgroundColor: "#F0F0F0",
    padding: "5px 0"
  },
  navTitle: {
    color: "#222",
    fontSize: "2.8ex",
    fontWeight: "600",
    margin: "0px 5px",
    padding: "0px 15px"
  },
  navLinks: {
    margin: "0 7px"
  },
  navLink: {
    color: "#444",
    fontSize: "2.3ex"
  },
  userLinks: {
    margin: "0 0 0 auto"
  }
});

const Navigation = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.navBar} position="sticky">
      <Toolbar variant="dense">
        <Link className={classes.navTitle} to="/">
          tsushiy
        </Link>
        <div className={classes.navLinks}>
          {NavLinks.map(link => (
            <React.Fragment key={link.name}>
              {link.url.startsWith("/") && (
                <Link to={link.url}>
                  <Button className={classes.navLink}>{link.name}</Button>
                </Link>
              )}
              {!link.url.startsWith("/") && (
                <a href={link.url}>
                  <Button className={classes.navLink}>{link.name}</Button>
                </a>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className={classes.userLinks}>
          <UserLinks />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
