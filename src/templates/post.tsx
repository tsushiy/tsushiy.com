import React from "react";
import type { FC } from 'react';
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import type { PageProps } from "gatsby";
import moment from "moment";
import { styled } from '@mui/system';
import { Container, Typography } from "@mui/material";
import Layout from "../layout";
import PostTags from "../components/PostTags";
import SocialLinks from "../components/SocialLinks";
import SEO from "../components/SEO";
import Footer from "../components/Footer";
import config from "../../data/SiteConfig";
import type { BlogPostBySlugQuery } from "types/graphql-type";
import type { PostPageContext } from "gatsby-node";

const PostTitleContainer = styled('div')({
  display: "flex",
  flexDirection: "column"
});
const PostTitleMeta = styled('div')({
  marginBottom: "3px"
});
const PostSocialMeta = styled('div')({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center"
});

const PostTemplate: FC<PageProps<BlogPostBySlugQuery, PostPageContext>> = (props) => {
  const { data, pageContext } = props;
  const { slug } = pageContext;
  const postNode = data.markdownRemark;
  const post = postNode.frontmatter;

  return (
    <Layout>
      <Helmet>
        <title>{`${post.title} | ${config.siteTitle}`}</title>
      </Helmet>
      <SEO postPath={slug} postNode={postNode} postSEO />
      <Container>
        <PostTitleContainer>
          <h1>{post.title}</h1>
          <PostTitleMeta>
            <Typography style={{ margin: "2px 5px" }}>
              {moment(post.date).format("MMMM Do, YYYY")}
            </Typography>
            <PostTags tags={post.tags} category={post.category} />
          </PostTitleMeta>
        </PostTitleContainer>
        <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
        <PostSocialMeta>
          <SocialLinks postPath={slug} postNode={postNode} />
        </PostSocialMeta>
        <Footer />
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
