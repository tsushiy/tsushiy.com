import React from "react";
import { Link, graphql } from "gatsby";
import Helmet from "react-helmet";
import { styled } from '@mui/system';
import { Container, Button } from "@mui/material";
import Layout from "../layout";
import SEO from "../components/SEO";
import Footer from "../components/Footer";
import PostListing from "../components/PostListing";
import icon from "../images/avatar.jpg";
import config from "../../data/SiteConfig";

const IndexHeader = styled('div')({
  width: "60%",
  margin: "30px auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-evenly"
});
const LinksContainer = styled('div')({
  maxWidth: "100%",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between"
});
const LinksHeader = styled('h2')({
  width: "80%",
  color: "#444",
  margin: "0 auto 0",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-evenly"
});

const IndexPage = props => {
  const { data } = props;
  const postEdges = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <Helmet title={`${config.siteTitle}`} />
      <SEO />
      <Container maxWidth="md">
        <IndexHeader>
          <img
            src={icon}
            className="newsletter-avatar"
            alt="tsushiy"
            width="115px"
            style={{ borderRadius: "50%" }}
          />
          <h1 style={{ margin: "0" }}>tsushiy</h1>
        </IndexHeader>
        <LinksContainer>
          <LinksHeader>
            Latest Articles
            <Link to="/blog">
              <Button disableRipple variant="outlined" size="small">
                View all
              </Button>
            </Link>
          </LinksHeader>
          <PostListing postEdges={postEdges} />
          <Link style={{ color: "#444" }} to="/blog">
            and more...
          </Link>
        </LinksContainer>
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
