import { faRss } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { styled } from '@mui/system'
import React from 'react'

import config from '../../data/SiteConfig'

import type { FC } from 'react'

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
  alignItems: 'center'
})

const Footer: FC = () => {
  const rssUrl = config.siteUrl + config.siteRss
  const { copyright } = config
  if (!copyright) {
    return null
  }

  return (
    <FooterContainer>
      <NoticeContainer>
        <h4 style={{ marginRight: '6px' }}>{copyright}</h4>
        <a href={rssUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#444' }}>
          <FontAwesomeIcon icon={faRss} />
        </a>
      </NoticeContainer>
    </FooterContainer>
  )
}

export default Footer
