import { Container, Button } from '@mui/material'
import { Link, graphql } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'

import config from '../../data/SiteConfig'
import PageTitle from '../components/PageTitle'
import PostListing from '../components/PostListing'
import Layout from '../layout'

import type { PageProps } from 'gatsby'
import type { TagPageContext } from 'gatsby-node'
import type { FC } from 'react'
import type { TagPageQuery } from 'types/graphql-type'

const TagTemplate: FC<PageProps<TagPageQuery, TagPageContext>> = (props) => {
  const { data, pageContext } = props
  const { tag } = pageContext
  const postEdges = data.allMarkdownRemark.edges

  return (
    <Layout>
      <Helmet title={`Posts tagged as "${tag}" | ${config.siteTitle}`} />
      <Container>
        <PageTitle title={`#${tag}`} />
        <Link style={{ margin: '0 5px' }} to="/tags">
          <Button color="secondary" variant="outlined">
            Tags
          </Button>
        </Link>
        <PostListing postEdges={postEdges} coverWidth={50} />
      </Container>
    </Layout>
  )
}

export default TagTemplate

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
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
            tags
          }
        }
      }
    }
  }
`
