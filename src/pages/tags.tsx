import { Button, Container } from '@mui/material'
import { styled } from '@mui/system'
import { graphql, Link } from 'gatsby'
import _ from 'lodash'
import React from 'react'
import Helmet from 'react-helmet'

import { TagsPageQuery } from 'types/graphql-type'

import config from '../../data/SiteConfig'
import Footer from '../components/Footer'
import PageTitle from '../components/PageTitle'
import SEO from '../components/SEO'
import Layout from '../layout'

import type { PageProps } from 'gatsby'
import type { FC } from 'react'

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
        <PageTitle title="Tags" />
        <TagsContainer>
          {group.map((tag) => (
            <Link key={tag.fieldValue} to={`/tags/${_.kebabCase(tag.fieldValue)}`}>
              <Button disableRipple variant="outlined" size="small" style={{ margin: '5px 3px' }}>
                {`#${tag.fieldValue} ${tag.totalCount}`}
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
