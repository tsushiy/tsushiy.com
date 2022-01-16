import React from "react";
import IconButton from "@mui/material/IconButton";
import { styled } from '@mui/system';
import config from "../../data/SiteConfig";

const UserLinksContainer = styled('div')({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  maxWidth: "100%"
});

const UserLinks = () => {
  const getLinkElements = () => {
    const { userLinks } = config;
    return userLinks.map(link => (
      <a href={link.url} key={link.label}>
        <IconButton type="button">
          <i className={link.iconClassName} />
        </IconButton>
      </a>
    ));
  };

  const { userLinks } = config;
  if (!userLinks) {
    return null;
  }
  return <UserLinksContainer>{getLinkElements()}</UserLinksContainer>;
};

export default UserLinks;
