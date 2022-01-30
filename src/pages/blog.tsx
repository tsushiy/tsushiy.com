import { Container, Button } from '@mui/material'
import { Link, graphql } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'

import { BlogPageQuery } from 'types/graphql-type'

import Footer from '../components/Footer'
import PageTitle from '../components/PageTitle'
import PostListing from '../components/PostListing'
import SEO from '../components/SEO'
import Layout from '../layout'

import type { PageProps } from 'gatsby'
import type { FC } from 'react'

const IndexPage: FC<PageProps<BlogPageQuery>> = (props) => {
  const { data } = props
  const postEdges = data.allMarkdownRemark.edges

  return (
    <Layout>
      <Helmet title="Blog" />
      <SEO />
      <Container>
        <PageTitle title="Blog" />
        <Link style={{ margin: '0 5px' }} to="/categories">
          <Button color="secondary" variant="outlined">
            Categories
          </Button>
        </Link>
        <Link style={{ margin: '0 5px' }} to="/tags">
          <Button color="secondary" variant="outlined">
            Tags
          </Button>
        </Link>
        <PostListing postEdges={postEdges} coverWidth={50} />
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
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            date
          }
          frontmatter {
            date
            title
            emoji
            cover {
              childImageSharp {
                gatsbyImageData(width: 50, height: 50)
              }
            }
            category
            tags
          }
        }
      }
    }
  }
`
