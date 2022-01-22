import React from 'react'
import type { FC } from 'react'
import Helmet from 'react-helmet'
import type { PageProps } from 'gatsby'
import { Container } from '@mui/material'
import Layout from '../layout'
import SEO from '../components/SEO'
import Footer from '../components/Footer'
import config from '../../data/SiteConfig'

const NotFoundPage: FC<PageProps> = (props) => {
  return (
    <Layout>
      <SEO />
      <Container maxWidth="md">
        <Helmet title={`Page not found – ${config.siteTitle}`} />
        <h1>404 Not Found.</h1>
      </Container>
      <Footer />
    </Layout>
  )
}

export default NotFoundPage
