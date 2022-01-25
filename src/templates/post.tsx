import { Container, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { graphql } from 'gatsby'
import moment from 'moment'
import React from 'react'
import Helmet from 'react-helmet'

import config from '../../data/SiteConfig'
import Footer from '../components/Footer'
import PostTags from '../components/PostTags'
import SEO from '../components/SEO'
import SocialLinks from '../components/SocialLinks'
import Layout from '../layout'

import type { PageProps } from 'gatsby'
import type { PostPageContext } from 'gatsby-node'
import type { FC } from 'react'
import type { BlogPostBySlugQuery } from 'types/graphql-type'

const PostTitleContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column'
})
const PostTitleMeta = styled('div')({
  marginBottom: '3px'
})
const PostSocialMeta = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
})

const PostTemplate: FC<PageProps<BlogPostBySlugQuery, PostPageContext>> = (props) => {
  const { data, pageContext } = props
  const { slug } = pageContext
  const postNode = data.markdownRemark
  const post = postNode.frontmatter

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
            <Typography style={{ margin: '2px 5px' }}>{moment(post.date).format('MMMM Do, YYYY')}</Typography>
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
  )
}

export default PostTemplate

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        emoji
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
`
