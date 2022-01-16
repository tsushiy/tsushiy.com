import React from "react";
import Helmet from "react-helmet";
import _ from "lodash";
import { Link, graphql } from "gatsby";
import { styled } from '@mui/system';
import { Button, Container } from "@mui/material";
import Layout from "../layout";
import SEO from "../components/SEO";
import Footer from "../components/Footer";
import config from "../../data/SiteConfig";

const CategoriesContainer = styled('div')({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "left"
});

const CategoriesPage = props => {
  const { data } = props;
  const { group } = data.allMarkdownRemark;
  group.sort((a, b) => b.totalCount - a.totalCount);

  return (
    <Layout>
      <Helmet title={`Tags – ${config.siteTitle}`} />
      <SEO />
      <Container>
        <h1>Categories</h1>
        <CategoriesContainer>
          {group.map(category => (
            <Link key={category.fieldValue} to={`/categories/${_.kebabCase(category.fieldValue)}`}>
              <Button
                disableRipple
                variant="outlined"
                size="medium"
                style={{ margin: "5px 3px" }}
              >
                {`${category.fieldValue} ${category.totalCount}`}
              </Button>
            </Link>
          ))}
        </CategoriesContainer>
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
