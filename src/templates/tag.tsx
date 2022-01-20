import React from "react";
import type { FC } from 'react';
import { Link, graphql } from "gatsby";
import type { PageProps } from "gatsby";
import Helmet from "react-helmet";

import { Container, Button } from "@mui/material";
import Layout from "../layout";
import PostListing from "../components/PostListing";
import config from "../../data/SiteConfig";
import type { TagPageQuery } from "types/graphql-type";
import type { TagPageContext } from "gatsby-node";

const TagTemplate: FC<PageProps<TagPageQuery, TagPageContext>> = (props) => {
  const { data, pageContext } = props;
  const { tag } = pageContext;
  const postEdges = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <Helmet title={`Posts tagged as "${tag}" | ${config.siteTitle}`} />
      <Container>
        <h2>{`Tag: ${tag}`}</h2>
        <Link style={{ margin: "0 5px" }} to="/tags">
          <Button variant="outlined">Tags</Button>
        </Link>
        <PostListing postEdges={postEdges} />
      </Container>
    </Layout>
  );
};

export default TagTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
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
                gatsbyImageData(width: 50, height: 50)
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
