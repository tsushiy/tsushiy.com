import React from 'react'
import type { FC } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import type { PageProps } from 'gatsby'
import { Container } from '@mui/material'
import Layout from '../layout'
import SEO from '../components/SEO'
import Footer from '../components/Footer'
import config from '../../data/SiteConfig'
import type { PageBySlugQuery } from 'types/graphql-type'
import type { PostPageContext } from 'gatsby-node'

const PageTemplate: FC<PageProps<PageBySlugQuery, PostPageContext>> = (props) => {
  const { data, pageContext } = props
  const { slug } = pageContext
  const postNode = data.markdownRemark
  const post = postNode.frontmatter

  return (
    <Layout>
      <Helmet>
        <title>{`${post.title} | ${config.siteTitle}`}</title>
      </Helmet>
      <SEO postPath={slug} postNode={postNode} />
      <Container>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
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
