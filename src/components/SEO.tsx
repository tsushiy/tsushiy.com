import { getSrc } from 'gatsby-plugin-image'
import React from 'react'
import Helmet from 'react-helmet'
import { BlogPosting, BreadcrumbList, WebSite, WithContext } from 'schema-dts'
import urljoin from 'url-join'

import { PostNode } from 'types/markdown-node'

import config from '../../data/SiteConfig'

import type { FC } from 'react'

interface Props {
  postNode?: PostNode
  postPath?: string
  postSEO?: boolean
}

const SEO: FC<Props> = (props) => {
  const { postNode, postPath, postSEO } = props
  let title
  let description
  let image
  let postURL
  if (postSEO) {
    const postMeta = postNode.frontmatter
    title = postMeta.title
    description = postNode.excerpt
    image = postMeta.cover ? getSrc(postMeta.cover.childImageSharp.gatsbyImageData) : config.siteLogo
    postURL = urljoin(config.siteUrl, config.pathPrefix, postPath)
  } else {
    title = config.siteTitle
    description = config.siteDescription
    image = config.siteLogo
  }

  if (!image.match('(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]')) {
    image = urljoin(config.siteUrl, config.pathPrefix, image)
  }

  const blogURL = urljoin(config.siteUrl, config.pathPrefix)
  const schemaOrgJSONLD: Array<WithContext<WebSite | BreadcrumbList | BlogPosting>> = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: blogURL,
      name: title,
      alternateName: config.siteTitleAlt ? config.siteTitleAlt : ''
    }
  ]
  if (postSEO) {
    schemaOrgJSONLD.push(
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@id': postURL,
              name: title,
              image
            }
          }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        url: blogURL,
        name: title,
        alternateName: config.siteTitleAlt ? config.siteTitleAlt : '',
        headline: title,
        image: {
          '@type': 'ImageObject',
          url: image
        },
        description
      }
    )
  }
  return (
    <Helmet>
      {/* General tags */}
      <meta name="description" content={description} />
      <meta name="image" content={image} />

      {/* Schema.org tags */}
      <script type="application/ld+json">{JSON.stringify(schemaOrgJSONLD)}</script>

      {/* OpenGraph tags */}
      <meta property="og:url" content={postSEO ? postURL : blogURL} />
      {postSEO ? <meta property="og:type" content="article" /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="fb:app_id" content={config.siteFBAppID ? config.siteFBAppID : ''} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={config.userTwitter ? config.userTwitter : ''} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}

export default SEO
