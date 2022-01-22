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

import type { FC } from 'react'

const LinkText = styled(ListItemText)({
  color: '#222'
})

interface Props {
  postEdges: Array<{
    node: PostNode
  }>
}

const PostListing: FC<Props> = (props) => {
  const getPostList = () => {
    const postList: Array<{
      path: MarkdownRemarkFields['slug']
      tags: MarkdownRemarkFrontmatter['tags']
      cover: { childImageSharp?: { gatsbyImageData: Scalars['JSON'] } }
      title: MarkdownRemarkFrontmatter['title']
      date: MarkdownRemarkFrontmatter['date']
      excerpt: MarkdownRemark['excerpt']
      timeToRead: MarkdownRemark['timeToRead']
    }> = []
    props.postEdges.forEach((postEdge) => {
      postList.push({
        path: postEdge.node.fields.slug,
        tags: postEdge.node.frontmatter.tags,
        cover: postEdge.node.frontmatter.cover,
        title: postEdge.node.frontmatter.title,
        date: postEdge.node.fields.date,
        excerpt: postEdge.node.excerpt,
        timeToRead: postEdge.node.timeToRead
      })
    })
    return postList
  }

  const postList = getPostList()
  return (
    <div>
      <List>
        {postList.map((post) => {
          const cover = post.cover.childImageSharp.gatsbyImageData ?? null
          return (
            <Link to={post.path} key={post.title}>
              <ListItem button disableRipple>
                <ListItemIcon style={{ margin: '0 15px' }}>
                  {cover ? <GatsbyImage alt={'cover'} image={cover} /> : null}
                </ListItemIcon>
                <LinkText primary={post.title} secondary={moment(post.date).format('MMM Do, YYYY')} />
              </ListItem>
            </Link>
          )
        })}
      </List>
    </div>
  )
}

export default PostListing
