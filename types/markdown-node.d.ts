import { MarkdownRemark, MarkdownRemarkFields, MarkdownRemarkFrontmatter, Maybe, Scalars } from './graphql-type'

export interface PostNode extends Pick<MarkdownRemark, 'excerpt'> {
  fields?: Maybe<MarkdownRemarkFields>
  frontmatter?: Maybe<Omit<MarkdownRemarkFrontmatter, 'cover'>> & {
    cover?: { childImageSharp?: { gatsbyImageData: Scalars['JSON'] } }
  }
}
