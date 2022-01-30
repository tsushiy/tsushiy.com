import { CalendarTodayOutlined } from '@mui/icons-material'
import { Container, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { graphql } from 'gatsby'
import moment from 'moment'
import React from 'react'
import Helmet from 'react-helmet'

import config from '../../data/SiteConfig'
import Footer from '../components/Footer'
import MarkdownBody from '../components/MarkdownBody'
import PageTitle from '../components/PageTitle'
import PostTags from '../components/PostTags'
import SEO from '../components/SEO'
import SocialLinks from '../components/SocialLinks'
import Layout from '../layout'

import type { PageProps } from 'gatsby'
import type { PostPageContext } from 'gatsby-node'
import type { FC } from 'react'
import type { BlogPostBySlugQuery } from 'types/graphql-type'

const PostTitleMeta = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '15px'
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
      <Helmet title={`${post.title} | ${config.siteTitle}`} />
      <SEO postPath={slug} postNode={postNode} postSEO />
      <Container>
        <PageTitle title={post.title} />
        <PostTitleMeta>
          <Typography style={{ fontSize: '.9rem', color: '#4e4e4e', marginLeft: '5px' }}>
            <CalendarTodayOutlined sx={{ fontSize: 'inherit', verticalAlign: '-2px', marginRight: '5px' }} />
            {moment(post.date).format(config.dateFormat)}
          </Typography>
          <PostTags tags={post.tags} category={post.category} />
        </PostTitleMeta>
        <MarkdownBody dangerHtml={postNode.html} />
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
      excerpt
      timeToRead
      fields {
        slug
        date
      }
      frontmatter {
        template
        date
        title
        emoji
        cover {
          childImageSharp {
            gatsbyImageData(width: 150, height: 150)
          }
        }
        category
        tags
      }
    }
  }
`
