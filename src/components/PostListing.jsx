import React from "react";
import moment from "moment";
import Img from "gatsby-image";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
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
        {/* Your post list here. */
        postList.map(post => {
          const cover = post.cover.childImageSharp.fixed
            ? post.cover.childImageSharp.fixed
            : null;
          return (
            <Link to={post.path} key={post.title}>
              <ListItem button disableRipple>
                <ListItemIcon style={{ margin: "0 15px" }}>
                  {cover ? <Img fixed={cover} /> : null}
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
