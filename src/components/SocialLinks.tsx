import { styled } from '@mui/system'
import React from 'react'
import { PocketShareButton, TwitterShareButton, PocketIcon, TwitterIcon } from 'react-share'
import urljoin from 'url-join'

import { PostNode } from 'types/markdown-node'

import config from '../../data/SiteConfig'

import type { FC } from 'react'

const SocialLinksContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'left',
  alignContent: 'center',
  alignItems: 'center',
  margin: '10px 0'
})

interface Props {
  postNode: PostNode
  postPath: string
  mobile?: boolean
}

const SocialLinks: FC<Props> = (props) => {
  const { postNode, postPath, mobile } = props
  const post = postNode.frontmatter
  const url = urljoin(config.siteUrl, config.pathPrefix, postPath)
  const iconSize = mobile ? 36 : 48

  return (
    <SocialLinksContainer>
      <TwitterShareButton url={url} title={post.title}>
        <TwitterIcon round size={iconSize} />
      </TwitterShareButton>
      <PocketShareButton url={url} title={post.title}>
        <PocketIcon round size={iconSize} />
      </PocketShareButton>
    </SocialLinksContainer>
  )
}

export default SocialLinks
