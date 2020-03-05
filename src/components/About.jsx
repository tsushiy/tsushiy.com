import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  about: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    minHeight: "300px"
  }
});

const About = props => {
  const classes = useStyles();

  return (
    <div className={classes.about}>
      <h1>
        Edit About component or pages/about.jsx to include your information.
      </h1>
    </div>
  );
};

export default About;
