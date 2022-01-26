import { Button, Container } from '@mui/material'
import { styled } from '@mui/system'
import { graphql, Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import Helmet from 'react-helmet'

import { IndexPageQuery } from 'types/graphql-type'

import config from '../../data/SiteConfig'
import Footer from '../components/Footer'
import PostListing from '../components/PostListing'
import SEO from '../components/SEO'
import Layout from '../layout'

import type { PageProps } from 'gatsby'
import type { FC } from 'react'

const IndexHeader = styled('div')({
  width: '60%',
  margin: '30px auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-evenly'
})
const LinksContainer = styled('div')({
  maxWidth: '100%',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between'
})
const LinksHeader = styled('h2')({
  width: '80%',
  color: '#444',
  margin: '0 auto 0',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-evenly'
})

const IndexPage: FC<PageProps<IndexPageQuery>> = (props) => {
  const { data } = props
  const postEdges = data.allMarkdownRemark.edges

  return (
    <Layout>
      <Helmet title={`${config.siteTitle}`} />
      <SEO />
      <Container>
        <IndexHeader>
          <StaticImage
            src={'../images/avatar.png'}
            className="newsletter-avatar"
            alt="tsushiy"
            width={115}
            style={{ borderRadius: '50%' }}
          />
          <h1 style={{ margin: '0' }}>tsushiy</h1>
        </IndexHeader>
        <LinksContainer>
          <LinksHeader>
            Latest Articles
            <Link to="/blog">
              <Button disableRipple variant="outlined" size="small">
                View all
              </Button>
            </Link>
          </LinksHeader>
          <PostListing postEdges={postEdges} coverWidth={40} />
          <Link style={{ color: '#444' }} to="/blog">
            <Button disableRipple variant="text" size="small">
              and more...
            </Button>
          </Link>
        </LinksContainer>
      </Container>
      <Footer />
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPage {
    allMarkdownRemark(
      limit: 6
      sort: { fields: [frontmatter___date], order: DESC }
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
            emoji
            cover {
              childImageSharp {
                gatsbyImageData(width: 40, height: 40)
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
