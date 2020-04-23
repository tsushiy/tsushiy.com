import React from "react";
import Helmet from "react-helmet";
import _ from "lodash";
import { Link, graphql } from "gatsby";
import { Button, Container } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import Layout from "../layout";
import SEO from "../components/SEO";
import Footer from "../components/Footer";
import config from "../../data/SiteConfig";

const useStyles = makeStyles({
  tagContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "left"
  }
});

const TagsPage = props => {
  const classes = useStyles();
  const { data } = props;
  const { group } = data.allMarkdownRemark;
  group.sort((a, b) => b.totalCount - a.totalCount);

  return (
    <Layout>
      <Helmet title={`Tags – ${config.siteTitle}`} />
      <SEO />
      <Container>
        <h1>Tags</h1>
        <div className={classes.tagContainer}>
          {group.map(tag => (
            <Link to={`/tags/${_.kebabCase(tag.fieldValue)}`}>
              <Button
                key={tag.fieldValue}
                disableRipple
                variant="outlined"
                size="medium"
                style={{ margin: "5px 3px" }}
              >
                {`${tag.fieldValue} ${tag.totalCount}`}
              </Button>
            </Link>
          ))}
        </div>
      </Container>
      <Footer />
    </Layout>
  );
};

export default TagsPage;

export const pageQuery = graphql`
  query TagsQuery {
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
