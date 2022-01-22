import React from 'react'
import type { FC } from 'react'
import { Link, graphql } from 'gatsby'
import type { PageProps } from 'gatsby'
import Helmet from 'react-helmet'

import { Container, Button } from '@mui/material'
import Layout from '../layout'
import SEO from '../components/SEO'
import Footer from '../components/Footer'
import PostListing from '../components/PostListing'
import { BlogPageQuery } from 'types/graphql-type'

const IndexPage: FC<PageProps<BlogPageQuery>> = (props) => {
  const { data } = props
  const postEdges = data.allMarkdownRemark.edges

  return (
    <Layout>
      <Helmet title="Articles" />
      <SEO />
      <Container>
        <h2>Articles</h2>
        <Link style={{ margin: '0 5px' }} to="/categories">
          <Button variant="outlined">Categories</Button>
        </Link>
        <Link style={{ margin: '0 5px' }} to="/tags">
          <Button variant="outlined">Tags</Button>
        </Link>
        <PostListing postEdges={postEdges} />
      </Container>
      <Footer />
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query BlogPage {
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
`
