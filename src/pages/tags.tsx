import React from 'react'
import type { FC } from 'react'
import Helmet from 'react-helmet'
import _ from 'lodash'
import { Link, graphql } from 'gatsby'
import type { PageProps } from 'gatsby'
import { styled } from '@mui/system'
import { Button, Container } from '@mui/material'
import Layout from '../layout'
import SEO from '../components/SEO'
import Footer from '../components/Footer'
import config from '../../data/SiteConfig'
import { TagsPageQuery } from 'types/graphql-type'

const TagsContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'left'
})

const TagsPage: FC<PageProps<TagsPageQuery>> = (props) => {
  const { data } = props
  const { group } = data.allMarkdownRemark
  group.sort((a, b) => b.totalCount - a.totalCount)

  return (
    <Layout>
      <Helmet title={`Tags – ${config.siteTitle}`} />
      <SEO />
      <Container>
        <h1>Tags</h1>
        <TagsContainer>
          {group.map((tag) => (
            <Link key={tag.fieldValue} to={`/tags/${_.kebabCase(tag.fieldValue)}`}>
              <Button disableRipple variant="outlined" size="medium" style={{ margin: '5px 3px' }}>
                {`${tag.fieldValue} ${tag.totalCount}`}
              </Button>
            </Link>
          ))}
        </TagsContainer>
      </Container>
      <Footer />
    </Layout>
  )
}

export default TagsPage

export const pageQuery = graphql`
  query TagsPage {
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
