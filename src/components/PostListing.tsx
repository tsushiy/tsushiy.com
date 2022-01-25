import { Box } from '@mui/material'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { styled } from '@mui/system'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import moment from 'moment'
import React from 'react'

import { MarkdownRemark, MarkdownRemarkFields, MarkdownRemarkFrontmatter, Scalars } from 'types/graphql-type'
import { PostNode } from 'types/markdown-node'

import config from '../../data/SiteConfig'

import type { FC } from 'react'

const LinkText = styled(ListItemText)({
  color: '#222'
})

interface Props {
  postEdges: Array<{
    node: PostNode
  }>
  coverWidth: number
}

interface Post {
  path: MarkdownRemarkFields['slug']
  tags: MarkdownRemarkFrontmatter['tags']
  emoji: MarkdownRemarkFrontmatter['emoji']
  cover: { childImageSharp?: { gatsbyImageData: Scalars['JSON'] } }
  title: MarkdownRemarkFrontmatter['title']
  date: MarkdownRemarkFrontmatter['date']
  excerpt: MarkdownRemark['excerpt']
  timeToRead: MarkdownRemark['timeToRead']
}

const PostListing: FC<Props> = (props) => {
  const getPostList = () => {
    const postList: Array<Post> = []
    props.postEdges.forEach((postEdge) => {
      postList.push({
        path: postEdge.node.fields.slug,
        tags: postEdge.node.frontmatter.tags,
        emoji: postEdge.node.frontmatter.emoji,
        cover: postEdge.node.frontmatter.cover,
        title: postEdge.node.frontmatter.title,
        date: postEdge.node.fields.date,
        excerpt: postEdge.node.excerpt,
        timeToRead: postEdge.node.timeToRead
      })
    })
    return postList
  }

  const getCover = (post: Post, width: number) => {
    const cover = post.cover?.childImageSharp.gatsbyImageData ?? null
    if (post.emoji) {
      return (
        <Box component="span" sx={{ fontSize: width, lineHeight: 1, color: 'initial', opacity: 0.9 }}>
          {post.emoji}
        </Box>
      )
    } else if (cover) {
      return <GatsbyImage alt={'cover'} image={cover} />
    } else {
      return null
    }
  }

  const postList = getPostList()
  return (
    <div>
      <List>
        {postList.map((post) => {
          return (
            <Link to={post.path} key={post.title}>
              <ListItem button disableRipple>
                <ListItemIcon style={{ margin: '0 15px' }}>{getCover(post, props.coverWidth)}</ListItemIcon>
                <LinkText primary={post.title} secondary={moment(post.date).format(config.dateFormat)} />
              </ListItem>
            </Link>
          )
        })}
      </List>
    </div>
  )
}

export default PostListing
