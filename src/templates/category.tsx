import React from 'react'
import type { FC } from 'react'
import { Link, graphql } from 'gatsby'
import type { PageProps } from 'gatsby'
import Helmet from 'react-helmet'

import { Container, Button } from '@mui/material'
import Layout from '../layout'
import PostListing from '../components/PostListing'
import config from '../../data/SiteConfig'
import type { CategoryPageQuery } from 'types/graphql-type'
import type { CategoryPageContext } from 'gatsby-node'

const CategoryTemplate: FC<PageProps<CategoryPageQuery, CategoryPageContext>> = (props) => {
  const { data, pageContext } = props
  const { category } = pageContext
  const postEdges = data.allMarkdownRemark.edges

  return (
    <Layout>
      <Helmet title={`Posts in category "${category}" | ${config.siteTitle}`} />
      <Container>
        <h2>{`Category: ${category}`}</h2>
        <Link style={{ margin: '0 5px' }} to="/categories">
          <Button variant="outlined">Categories</Button>
        </Link>
        <PostListing postEdges={postEdges} />
      </Container>
    </Layout>
  )
}

export default CategoryTemplate

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
