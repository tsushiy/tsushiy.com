/* eslint "no-console": "off" */

import path from 'path'

import _ from 'lodash'
import moment from 'moment'

import siteConfig from './data/SiteConfig'

import type { GatsbyNode } from 'gatsby'
import type { MarkdownRemark, MarkdownRemarkConnection } from 'types/graphql-type'

export interface PostPageContext {
  slug: string
  nexttitle: string
  nextslug: string
  prevtitle: string
  prevslug: string
}

export interface TagPageContext {
  tag: string
}

export interface CategoryPageContext {
  category: string
}

export const onCreateNode: GatsbyNode<MarkdownRemark>['onCreateNode'] = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'MarkdownRemark') {
    let slug
    const template = node?.frontmatter?.template
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath as string)

    switch (template) {
      case 'page':
        slug = `/${parsedFilePath.name}/`
        break
      case 'post':
        slug = `/blog/${parsedFilePath.name}/`
        break
      default:
        console.warn('WARNING: Invalid template.', node.frontmatter)
        return
    }

    createNodeField({ node, name: 'slug', value: slug })

    const date = node?.frontmatter?.date
    if (date) {
      const date = moment(node.frontmatter.date, siteConfig.dateFromFormat)
      if (!date.isValid) console.warn('WARNING: Invalid date.', node.frontmatter)

      createNodeField({ node, name: 'date', value: date.toISOString() })
    }
  }
}

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
  const { createPage } = actions
  const postPage = path.resolve('src/templates/post.tsx')
  const pagePage = path.resolve('src/templates/page.tsx')
  const tagPage = path.resolve('src/templates/tag.tsx')
  const categoryPage = path.resolve('src/templates/category.tsx')

  // Get a full list of markdown posts
  const markdownQueryResult: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors?: any
    data?: { allMarkdownRemark: MarkdownRemarkConnection }
  } = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              tags
              category
              date
              template
            }
          }
        }
      }
    }
  `)

  if (markdownQueryResult.errors) {
    console.error(markdownQueryResult.errors)
    throw markdownQueryResult.errors
  }

  const tagSet = new Set<string>()
  const categorySet = new Set<string>()

  const postsEdges = markdownQueryResult?.data?.allMarkdownRemark?.edges

  // Sort posts
  postsEdges.sort((postA, postB) => {
    const dateA = moment(postA.node.frontmatter.date, siteConfig.dateFromFormat)

    const dateB = moment(postB.node.frontmatter.date, siteConfig.dateFromFormat)

    if (dateA.isBefore(dateB)) return 1
    if (dateB.isBefore(dateA)) return -1

    return 0
  })

  // Post page creating
  postsEdges.forEach((edge, index) => {
    // Generate a list of tags
    if (edge.node.frontmatter.tags) {
      edge.node.frontmatter.tags.forEach((tag) => {
        tagSet.add(tag)
      })
    }

    // Generate a list of categories
    if (edge.node.frontmatter.category) {
      categorySet.add(edge.node.frontmatter.category)
    }

    // Create post pages
    const nextID = index + 1 < postsEdges.length ? index + 1 : 0
    const prevID = index - 1 >= 0 ? index - 1 : postsEdges.length - 1
    const nextEdge = postsEdges[nextID]
    const prevEdge = postsEdges[prevID]
    const component = edge.node.frontmatter.template === 'post' ? postPage : pagePage

    createPage<PostPageContext>({
      path: edge.node.fields.slug,
      component,
      context: {
        slug: edge.node.fields.slug,
        nexttitle: nextEdge.node.frontmatter.title,
        nextslug: nextEdge.node.fields.slug,
        prevtitle: prevEdge.node.frontmatter.title,
        prevslug: prevEdge.node.fields.slug
      }
    })
  })

  //  Create tag pages
  tagSet.forEach((tag) => {
    createPage<TagPageContext>({
      path: `/tags/${_.kebabCase(tag)}/`,
      component: tagPage,
      context: { tag }
    })
  })

  // Create category pages
  categorySet.forEach((category) => {
    createPage<CategoryPageContext>({
      path: `/categories/${_.kebabCase(category)}/`,
      component: categoryPage,
      context: { category }
    })
  })
}
