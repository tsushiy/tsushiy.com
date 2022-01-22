import { AppBar, Toolbar, Button } from '@mui/material'
import { styled } from '@mui/system'
import { Link } from 'gatsby'
import React from 'react'

import NavLinks from '../../data/NavLinks'

import UserLinks from './UserLinks'

import type { FC } from 'react'

const NavBar = styled(AppBar)({
  backgroundColor: '#F0F0F0',
  padding: '5px 0'
})
const NavTitle = styled(Link)({
  color: '#222',
  fontSize: '2.8ex',
  fontWeight: '600',
  margin: '0px 5px',
  padding: '0px 15px'
})
const NavLinksContainer = styled('div')({
  margin: '0 7px'
})
const NavLink = styled(Button)({
  color: '#444',
  fontSize: '2.3ex'
})
const UserLinksContainer = styled('div')({
  margin: '0 0 0 auto'
})

const Navigation: FC = (props) => {
  return (
    <NavBar position="sticky">
      <Toolbar variant="dense">
        <NavTitle to="/">tsushiy</NavTitle>
        <NavLinksContainer>
          {NavLinks.map((link) => (
            <React.Fragment key={link.name}>
              {link.url.startsWith('/') && (
                <Link to={link.url}>
                  <NavLink>{link.name}</NavLink>
                </Link>
              )}
              {!link.url.startsWith('/') && (
                <a href={link.url}>
                  <NavLink>{link.name}</NavLink>
                </a>
              )}
            </React.Fragment>
          ))}
        </NavLinksContainer>
        <UserLinksContainer>
          <UserLinks />
        </UserLinksContainer>
      </Toolbar>
    </NavBar>
  )
}

export default Navigation
