import { Container } from '@mui/material'
import React from 'react'
import Helmet from 'react-helmet'

import config from '../../data/SiteConfig'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import Layout from '../layout'

import type { PageProps } from 'gatsby'
import type { FC } from 'react'

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
