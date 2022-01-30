import { styled } from '@mui/system'
import React from 'react'

import type { FC } from 'react'

const StyledPageTitle = styled('h1')({
  fontSize: '32px'
})

interface Props {
  title: string
}

const PageTitle: FC<Props> = (props) => {
  const { title } = props
  return <StyledPageTitle>{title}</StyledPageTitle>
}

export default PageTitle
