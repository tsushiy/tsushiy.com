const config = {
  siteTitle: 'tsushiy.com', // Site title.
  siteTitleShort: 'tsushiy.com', // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: 'tsushiy.com', // Alternative site title for SEO.
  siteLogo: '', // Logo used for SEO and manifest.
  siteUrl: 'https://tsushiy.com', // Domain of your website without pathPrefix.
  pathPrefix: '/', // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription: 'tsushiyの個人ブログ', // Website description used for RSS feeds/meta description tag.
  siteRss: '/rss.xml', // Path to the RSS file.
  siteRssTitle: 'tsushiy.com', // Title of the RSS feed
  googleAnalyticsID: 'UA-136429373-4', // GA tracking ID.
  dateFromFormat: 'YYYY-MM-DD', // Date format used in the frontmatter.
  dateFormat: 'YYYY/MM/DD', // Date format for display.
  postsPerPage: 4, // Amount of posts displayed per listing page.
  userName: 'tsushiy', // Username to display in the author segment.
  userEmail: '', // Email used for RSS feed's author segment
  gitHubUrl: 'https://github.com/tsushiy',
  siteFBAppID: '',
  userTwitter: '',
  copyright: '© tsushiy', // Copyright string for the footer of the website and RSS feed.
  themeColor: '#a7d28d', // Used for setting manifest and progress theme colors.
  backgroundColor: '#e0e0e0' // Used for setting manifest background color.
}

// Validate

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === '/') {
  config.pathPrefix = ''
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, '')}`
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === '/') config.siteUrl = config.siteUrl.slice(0, -1)

// Make sure siteRss has a starting forward slash
if (config.siteRss && config.siteRss[0] !== '/') config.siteRss = `/${config.siteRss}`

export default config
