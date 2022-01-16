import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import moment from "moment";
import { Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Layout from "../layout";
import PostTags from "../components/PostTags";
import SocialLinks from "../components/SocialLinks";
import SEO from "../components/SEO";
import Footer from "../components/Footer";
import config from "../../data/SiteConfig";

const useStyles = makeStyles({
  postContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  postTitleContainer: {
    display: "flex",
    flexDirection: "column"
  },
  postTitleMeta: {
    marginBottom: "3px"
  },
  postSocialMeta: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }
});

const PostTemplate = props => {
  const classes = useStyles();
  const { data, pageContext } = props;
  const { slug } = pageContext;
  const postNode = data.markdownRemark;
  const post = postNode.frontmatter;
  if (!post.id) {
    post.id = slug;
  }

  return (
    <Layout>
      <Helmet>
        <title>{`${post.title} | ${config.siteTitle}`}</title>
      </Helmet>
      <SEO postPath={slug} postNode={postNode} postSEO />
      <Container>
        <div className={classes.postTitleContainer}>
          <h1>{post.title}</h1>
          <div className={classes.postTitleMeta}>
            <Typography style={{ margin: "2px 5px" }}>
              {moment(post.date).format("MMMM Do, YYYY")}
            </Typography>
            <PostTags tags={post.tags} category={post.category} />
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
        <div className={classes.postSocialMeta}>
          <SocialLinks postPath={slug} postNode={postNode} />
        </div>
        <Footer config={config} />
      </Container>
    </Layout>
  );
};

export default PostTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        cover {
          childImageSharp {
            gatsbyImageData(width: 150, height: 150)
          }
        }
        date
        template
        category
        tags
      }
      fields {
        slug
        date
      }
    }
  }
`;
