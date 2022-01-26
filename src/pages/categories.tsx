import { Button, Container } from '@mui/material'
import { styled } from '@mui/system'
import { graphql, Link } from 'gatsby'
import _ from 'lodash'
import React from 'react'
import Helmet from 'react-helmet'

import { CategoriesPageQuery } from 'types/graphql-type'

import config from '../../data/SiteConfig'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import Layout from '../layout'

import type { PageProps } from 'gatsby'
import type { FC } from 'react'

const CategoriesContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'left'
})

const CategoriesPage: FC<PageProps<CategoriesPageQuery>> = (props) => {
  const { data } = props
  const { group } = data.allMarkdownRemark
  group.sort((a, b) => b.totalCount - a.totalCount)

  return (
    <Layout>
      <Helmet title={`Categories – ${config.siteTitle}`} />
      <SEO />
      <Container>
        <h1>Categories</h1>
        <CategoriesContainer>
          {group.map((category) => (
            <Link key={category.fieldValue} to={`/categories/${_.kebabCase(category.fieldValue)}`}>
              <Button disableRipple variant="outlined" size="medium" style={{ margin: '5px 3px' }}>
                {`${category.fieldValue} ${category.totalCount}`}
              </Button>
            </Link>
          ))}
        </CategoriesContainer>
      </Container>
      <Footer />
    </Layout>
  )
}

export default CategoriesPage

export const pageQuery = graphql`
  query CategoriesPage {
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`
