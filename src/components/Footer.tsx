import React from 'react'
import type { FC } from 'react'
import { styled } from '@mui/system'
import config from '../../data/SiteConfig'

const FooterContainer = styled('footer')({
  justifyContent: 'center',
  alignContent: 'center',
  padding: '10px 5px 5px'
})
const NoticeContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
  marginTop: '25px'
})

const Footer: FC = (props) => {
  const rssUrl = config.siteUrl + config.siteRss
  const { copyright } = config
  if (!copyright) {
    return null
  }

  return (
    <FooterContainer>
      <NoticeContainer>
        <h4>{copyright}</h4>
        &nbsp;
        <a href={rssUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#444' }}>
          <i className="fas fa-rss" />
        </a>
      </NoticeContainer>
    </FooterContainer>
  )
}

export default Footer
