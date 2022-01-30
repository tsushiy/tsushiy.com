import { styled } from '@mui/system'
import React from 'react'

import type { FC } from 'react'

const StyledPageTitle = styled('h1')({
  fontSize: '2rem',
  margin: '2rem 0 0.8rem',
  '@media (max-width: 760px)': {
    fontSize: '1.5rem',
    margin: '1.5rem 0 0.5rem'
  }
})

interface Props {
  title: string
}

const PageTitle: FC<Props> = (props) => {
  const { title } = props
  return <StyledPageTitle>{title}</StyledPageTitle>
}

export default PageTitle
