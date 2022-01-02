import React from "react";
import { Link, graphql } from "gatsby";
import Helmet from "react-helmet";

import { Container, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../layout";
import SEO from "../components/SEO";
import Footer from "../components/Footer";
import PostListing from "../components/PostListing";
import icon from "../images/avatar.jpg";
import config from "../../data/SiteConfig";

const useStyles = makeStyles({
  indexHeader: {
    width: "60%",
    margin: "30px auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  linksContainer: {
    maxWidth: "100%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between"
  },
  linksHeader: {
    width: "80%",
    color: "#444",
    margin: "0 auto 0",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-evenly"
  }
});

const IndexPage = props => {
  const classes = useStyles();
  const { data } = props;
  const postEdges = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <Helmet title={`${config.siteTitle}`} />
      <SEO />
      <Container maxWidth="md">
        <div className={classes.indexHeader}>
          <img
            src={icon}
            className="newsletter-avatar"
            alt="tsushiy"
            width="115px"
            style={{ borderRadius: "50%" }}
          />
          <h1 style={{ margin: "0" }}>tsushiy</h1>
        </div>
        <div className={classes.linksContainer}>
          <h2 className={classes.linksHeader}>
            Latest Articles
            <Link to="/blog">
              <Button disableRipple variant="outlined" size="small">
                View all
              </Button>
            </Link>
          </h2>
          <PostListing postEdges={postEdges} />
          <Link style={{ color: "#444" }} to="/blog">
            and more...
          </Link>
        </div>
      </Container>
      <Footer />
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 6
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            category
            cover {
              childImageSharp {
                gatsbyImageData(width: 40, height: 40)
              }
            }
            date
            template
          }
        }
      }
    }
  }
`;
