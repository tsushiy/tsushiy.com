import React from "react";
import { makeStyles } from "@mui/styles";
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

const useStyles = makeStyles({
  socialLinks: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "left",
    alignContent: "center",
    alignItems: "center",
    margin: "20px 0"
  }
});

const SocialLinks = props => {
  const classes = useStyles();
  const { postNode, postPath, mobile } = props;
  const post = postNode.frontmatter;
  const url = urljoin(config.siteUrl, config.pathPrefix, postPath);
  const iconSize = mobile ? 36 : 48;
  const filter = count => (count > 0 ? count : "");
  const renderShareCount = count => (
    <div className="share-count">{filter(count)}</div>
  );

  return (
    <div className={classes.socialLinks}>
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
    </div>
  );
};

export default SocialLinks;
