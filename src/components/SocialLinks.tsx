import React from "react";
import { styled } from '@mui/system';
import {
  FacebookShareButton,
  PocketShareButton,
  TwitterShareButton,
  FacebookShareCount,
  FacebookIcon,
  PocketIcon,
  TwitterIcon
} from "react-share";
import urljoin from "url-join";
import config from "../../data/SiteConfig";

const SocialLinksContainer = styled('div')({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "left",
  alignContent: "center",
  alignItems: "center",
  margin: "20px 0"
});

const SocialLinks = props => {
  const { postNode, postPath, mobile } = props;
  const post = postNode.frontmatter;
  const url = urljoin(config.siteUrl, config.pathPrefix, postPath);
  const iconSize = mobile ? 36 : 48;
  const filter = count => (count > 0 ? count : "");
  const renderShareCount = count => (
    <div className="share-count">{filter(count)}</div>
  );

  return (
    <SocialLinksContainer>
      <TwitterShareButton url={url} title={post.title}>
        <TwitterIcon round size={iconSize} />
      </TwitterShareButton>
      <FacebookShareButton url={url} quote={postNode.excerpt}>
        <FacebookIcon round size={iconSize} />
        <FacebookShareCount url={url}>
          {count => renderShareCount(count)}
        </FacebookShareCount>
      </FacebookShareButton>
      <PocketShareButton url={url} title={post.title}>
        <PocketIcon round size={iconSize} />
      </PocketShareButton>
    </SocialLinksContainer>
  );
};

export default SocialLinks;
