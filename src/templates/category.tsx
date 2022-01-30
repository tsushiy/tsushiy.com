import { Container, Button } from '@mui/material'
import { Link, graphql } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'

import config from '../../data/SiteConfig'
import PageTitle from '../components/PageTitle'
import PostListing from '../components/PostListing'
import Layout from '../layout'

import type { PageProps } from 'gatsby'
import type { CategoryPageContext } from 'gatsby-node'
import type { FC } from 'react'
import type { CategoryPageQuery } from 'types/graphql-type'

const CategoryTemplate: FC<PageProps<CategoryPageQuery, CategoryPageContext>> = (props) => {
  const { data, pageContext } = props
  const { category } = pageContext
  const postEdges = data.allMarkdownRemark.edges

  return (
    <Layout>
      <Helmet title={`Posts in category "${category}" | ${config.siteTitle}`} />
      <Container>
        <PageTitle title={category} />
        <Link style={{ margin: '0 5px' }} to="/categories">
          <Button color="secondary" variant="outlined">
            Categories
          </Button>
        </Link>
        <PostListing postEdges={postEdges} coverWidth={50} />
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
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
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
                gatsbyImageData(width: 50, height: 50)
              }
            }
            tags
          }
        }
      }
    }
  }
`
