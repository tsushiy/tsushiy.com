import React from "react";
import moment from "moment";
import { GatsbyImage } from "gatsby-plugin-image"
import { makeStyles } from "@mui/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "gatsby";

const useStyles = makeStyles({
  linkText: {
    color: "#222"
  },
  listItem: {
    maxHeight: "120px"
  }
});

const PostListing = props => {
  const classes = useStyles();

  const getPostList = () => {
    const postList = [];
    props.postEdges.forEach(postEdge => {
      postList.push({
        path: postEdge.node.fields.slug,
        tags: postEdge.node.frontmatter.tags,
        cover: postEdge.node.frontmatter.cover,
        title: postEdge.node.frontmatter.title,
        date: postEdge.node.fields.date,
        excerpt: postEdge.node.excerpt,
        timeToRead: postEdge.node.timeToRead
      });
    });
    return postList;
  };

  const postList = getPostList();
  return (
    <div>
      <List>
        {postList.map(post => {
          const cover = post.cover.childImageSharp.gatsbyImageData ?? null;
          return (
            <Link to={post.path} key={post.title}>
              <ListItem button disableRipple>
                <ListItemIcon style={{ margin: "0 15px" }}>
                  {cover ? <GatsbyImage image={cover} /> : null}
                </ListItemIcon>
                <ListItemText
                  className={classes.linkText}
                  primary={post.title}
                  secondary={moment(post.date).format("MMM Do, YYYY")}
                />
              </ListItem>
            </Link>
          );
        })}
      </List>
    </div>
  );
};

export default PostListing;
