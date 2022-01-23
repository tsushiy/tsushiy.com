import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/system'
import React from 'react'

import config from '../../data/SiteConfig'

import type { FC } from 'react'

const UserLinksContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: '100%'
})

const UserLinks: FC = () => {
  const getGitHubLinkElement = () => {
    const { gitHubUrl } = config
    return (
      <a href={gitHubUrl} key={'GitHub'}>
        <IconButton type="button">
          <FontAwesomeIcon icon={faGithub} />
        </IconButton>
      </a>
    )
  }
  return <UserLinksContainer>{getGitHubLinkElement()}</UserLinksContainer>
}

export default UserLinks
