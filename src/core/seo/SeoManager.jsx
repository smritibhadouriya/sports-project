import { Helmet } from 'react-helmet-async'
import { seoConfig } from '@/config/seo.config'

const SeoManager = ({
  title,
  description,
  canonical,
  image,
  type = 'website',
  noIndex = false,
  jsonLd,
}) => {
  const resolvedTitle = title || seoConfig.defaultTitle
  const resolvedDesc = description || seoConfig.defaultDescription
  const resolvedImage = image || seoConfig.defaultImage
  const resolvedCanonical = canonical || seoConfig.siteUrl

  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDesc} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={resolvedCanonical} />

      {/* OpenGraph */}
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDesc} />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:url" content={resolvedCanonical} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={seoConfig.siteName} />
      <meta property="og:locale" content={seoConfig.locale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={seoConfig.twitterHandle} />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDesc} />
      <meta name="twitter:image" content={resolvedImage} />

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
      {!jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(seoConfig.jsonLd.organization)}
        </script>
      )}
    </Helmet>
  )
}

export default SeoManager
