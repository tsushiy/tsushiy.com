import React from "react";
import _ from "lodash";
import { makeStyles } from "@mui/styles";
import { Link } from "gatsby";
import { Button } from "@mui/material";

const useStyles = makeStyles({
  postCategoryContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "left",
    margin: "3px 0"
  },
  postTagContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "left",
    margin: "3px 0"
  }
});

const PostTags = props => {
  const classes = useStyles();
  const { tags, category } = props;
  return (
    <div>
      <div className={classes.postCategoryContainer}>
        <h4 style={{ margin: "0 3px 0 5px" }}>Category:</h4>
        <Link
          style={{ textDecoration: "none" }}
          to={`/categories/${_.kebabCase(category)}`}
        >
          <Button disableRipple variant="text" size="small">
            {category}
          </Button>
        </Link>
      </div>
      <div className={classes.postTagContainer}>
        <h4 style={{ margin: "0 3px 0 5px" }}>Tags:</h4>
        {tags &&
          tags.map(tag => (
            <Link
              key={tag}
              style={{ textDecoration: "none", margin: "2px 3px" }}
              to={`/tags/${_.kebabCase(tag)}`}
            >
              <Button disableRipple variant="outlined" size="small">
                {tag}
              </Button>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PostTags;
