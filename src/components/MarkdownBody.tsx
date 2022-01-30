import { styled } from '@mui/system'
import React from 'react'

import type { FC } from 'react'

const MarkdownContainer = styled('div')({
  '& > :first-child': {
    marginTop: '0'
  },
  '& h1': {
    fontSize: '2rem',
    margin: '1.5rem 0 0',
    paddingBottom: '.3rem',
    borderBottom: '1px solid #9e9e9e77'
  },
  '& h2': {
    fontSize: '1.5rem',
    margin: '0.7rem 0 0.5rem'
  },
  '& h3': {
    fontSize: '1.25rem',
    margin: '0.7rem 0'
  },
  '@media (max-width: 760px)': {
    '& h1': {
      fontSize: '1.6rem',
      margin: '1rem 0 0',
      paddingBottom: '.2rem'
    },
    '& h2': {
      fontSize: '1.4rem',
      margin: '0.5rem 0 0.3rem'
    },
    '& h3': {
      fontSize: '1.15rem',
      margin: '0.3rem 0'
    }
  }
})

interface Props {
  dangerHtml: string
}

const PageTitle: FC<Props> = (props) => {
  const { dangerHtml } = props
  return <MarkdownContainer dangerouslySetInnerHTML={{ __html: dangerHtml }} />
}

export default PageTitle
