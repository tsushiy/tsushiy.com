import { Container } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { styled } from '@mui/system'
import React from 'react'
import Helmet from 'react-helmet'

import config from '../../data/SiteConfig'
import Navigation from '../components/Navigation'

import type { FC } from 'react'
import 'katex/dist/katex.min.css'
import 'prismjs/themes/prism-tomorrow.css'
import './index.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#424242'
    },
    secondary: {
      main: '#507C61'
    }
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  }
})
const IndexChildrenContainer = styled(Container)({
  margin: '1em auto'
})

type LayoutProps = {
  children?: React.ReactNode
}

const MainLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <meta name="description" content={config.siteDescription} />
        <html lang="ja" />
      </Helmet>
      <Navigation />
      <IndexChildrenContainer maxWidth="md">{children}</IndexChildrenContainer>
    </ThemeProvider>
  )
}

export default MainLayout
