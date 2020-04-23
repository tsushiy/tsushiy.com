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
  categoryContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "left"
  }
});

const CategoriesPage = props => {
  const classes = useStyles();
  const { data } = props;
  const { group } = data.allMarkdownRemark;
  group.sort((a, b) => b.totalCount - a.totalCount);

  return (
    <Layout>
      <Helmet title={`Tags – ${config.siteTitle}`} />
      <SEO />
      <Container>
        <h1>Categories</h1>
        <div className={classes.categoryContainer}>
          {group.map(category => (
            <Link to={`/categories/${_.kebabCase(category.fieldValue)}`}>
              <Button
                key={category.fieldValue}
                disableRipple
                variant="outlined"
                size="medium"
                style={{ margin: "5px 3px" }}
              >
                {`${category.fieldValue} ${category.totalCount}`}
              </Button>
            </Link>
          ))}
        </div>
      </Container>
      <Footer />
    </Layout>
  );
};

export default CategoriesPage;

export const pageQuery = graphql`
  query CategoriesQuery {
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`;
