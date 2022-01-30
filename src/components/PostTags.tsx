import { Button } from '@mui/material'
import { styled } from '@mui/system'
import { Link } from 'gatsby'
import _ from 'lodash'
import React from 'react'

import { MarkdownRemarkFrontmatter } from 'types/graphql-type'

import type { FC } from 'react'

const PostCategoryContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'left'
})
const PostTagContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'left'
})

interface Props {
  tags: MarkdownRemarkFrontmatter['tags']
  category: MarkdownRemarkFrontmatter['category']
}

const PostTags: FC<Props> = (props) => {
  const { tags, category } = props
  return (
    <div>
      <PostCategoryContainer>
        <span style={{ margin: '0 3px 0 5px', fontWeight: 'bold' }}>Category:</span>
        <Link style={{ textDecoration: 'none' }} to={`/categories/${_.kebabCase(category)}`}>
          <Button disableRipple variant="text" size="small">
            {category}
          </Button>
        </Link>
      </PostCategoryContainer>
      <PostTagContainer>
        <span style={{ margin: '0 3px 0 5px', fontWeight: 'bold' }}>Tags:</span>
        {tags &&
          tags.map((tag) => (
            <Link key={tag} style={{ textDecoration: 'none', margin: '2px 3px' }} to={`/tags/${_.kebabCase(tag)}`}>
              <Button disableRipple variant="text" size="small">
                #{tag}
              </Button>
            </Link>
          ))}
      </PostTagContainer>
    </div>
  )
}

export default PostTags
