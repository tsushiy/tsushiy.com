import React from "react";
import { Link, graphql } from "gatsby";
import Helmet from "react-helmet";

import { Container, Button } from "@material-ui/core";
import Layout from "../layout";
import PostListing from "../components/PostListing";
import config from "../../data/SiteConfig";

const CategoryTemplate = props => {
  const { data, pageContext } = props;
  const { category } = pageContext;
  const postEdges = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <Helmet title={`Posts in category "${category}" | ${config.siteTitle}`} />
      <Container>
        <h2>{`Category: ${category}`}</h2>
        <Link style={{ margin: "0 5px" }} to="/categories">
          <Button variant="outlined">Categories</Button>
        </Link>
        <PostListing postEdges={postEdges} />
      </Container>
    </Layout>
  );
};

export default CategoryTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      totalCount
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
