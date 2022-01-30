import { Container } from '@mui/material'
import { graphql } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'

import config from '../../data/SiteConfig'
import Footer from '../components/Footer'
import MarkdownBody from '../components/MarkdownBody'
import PageTitle from '../components/PageTitle'
import SEO from '../components/SEO'
import Layout from '../layout'

import type { PageProps } from 'gatsby'
import type { PostPageContext } from 'gatsby-node'
import type { FC } from 'react'
import type { PageBySlugQuery } from 'types/graphql-type'

const PageTemplate: FC<PageProps<PageBySlugQuery, PostPageContext>> = (props) => {
  const { data, pageContext } = props
  const { slug } = pageContext
  const postNode = data.markdownRemark
  const post = postNode.frontmatter

  return (
    <Layout>
      <Helmet title={`${post.title} | ${config.siteTitle}`} />
      <SEO postPath={slug} postNode={postNode} />
      <Container>
        <PageTitle title={post.title} />
        <MarkdownBody dangerHtml={postNode.html} />
        <Footer />
      </Container>
    </Layout>
  )
}

export default PageTemplate

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        template
      }
      fields {
        slug
        date
      }
    }
  }
`
