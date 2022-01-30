import { Container } from '@mui/material'
import React from 'react'
import Helmet from 'react-helmet'

import config from '../../data/SiteConfig'
import Footer from '../components/Footer'
import PageTitle from '../components/PageTitle'
import SEO from '../components/SEO'
import Layout from '../layout'

import type { PageProps } from 'gatsby'
import type { FC } from 'react'

const NotFoundPage: FC<PageProps> = () => {
  return (
    <Layout>
      <Helmet title={`Page not found – ${config.siteTitle}`} />
      <SEO />
      <Container maxWidth="md">
        <PageTitle title="404 Not Found." />
      </Container>
      <Footer />
    </Layout>
  )
}

export default NotFoundPage
