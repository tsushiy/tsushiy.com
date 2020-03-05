import React from "react";
import { Link } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import NavLinks from "../../data/NavLinks";
import UserLinks from "../components/UserLinks";

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
            <Link key={link.name} to={link.link}>
              <Button className={classes.navLink}>{link.name}</Button>
            </Link>
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
