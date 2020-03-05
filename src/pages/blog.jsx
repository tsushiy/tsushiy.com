import React from "react";
import { Link } from "gatsby";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import { Container, Button } from "@material-ui/core";
import Layout from "../layout";
import SEO from "../components/SEO";
import Footer from "../components/Footer";
import PostListing from "../components/PostListing";

const IndexPage = props => {
  const postEdges = props.data.allMarkdownRemark.edges;

  return (
    <Layout>
      <Helmet title={`Articles`} />
      <SEO />
      <Container>
        <h2>Articles</h2>
        <Link style={{ margin: "0 5px" }} to="/categories">
          <Button variant="outlined">Categories</Button>
        </Link>
        <Link style={{ margin: "0 5px" }} to="/tags">
          <Button variant="outlined">Tags</Button>
        </Link>
        <PostListing postEdges={postEdges} />
      </Container>
      <Footer />
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query BlogQuery {
    allMarkdownRemark(
      limit: 1000
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
                fixed(width: 50, height: 50) {
                  ...GatsbyImageSharpFixed
                }
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
