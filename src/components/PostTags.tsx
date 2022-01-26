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
  justifyContent: 'left',
  margin: '3px 0'
})
const PostTagContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'left',
  margin: '3px 0'
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
        <h4 style={{ margin: '0 3px 0 5px' }}>Category:</h4>
        <Link style={{ textDecoration: 'none' }} to={`/categories/${_.kebabCase(category)}`}>
          <Button disableRipple variant="text" size="small">
            {category}
          </Button>
        </Link>
      </PostCategoryContainer>
      <PostTagContainer>
        <h4 style={{ margin: '0 3px 0 5px' }}>Tags:</h4>
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
