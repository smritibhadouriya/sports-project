import React from "react";
import { Helmet } from "react-helmet-async";
import { VITE_BACKEND_URL } from "../../config.js";

const SEO_CONFIG = {
  siteName: "SportlyRadar",
  defaultTitle: "sportlyradar - Your Ultimate Sports Hub",
  titleSeparator: " | ",
  defaultDescription:
    "Stay updated with the latest sports news, analysis, and insights on SportlyRadar.",
  defaultKeywords: ["sports", "news", "analysis", "scores", "teams", "players"],
  siteUrl: "https://www.sportlyradar.com",
  defaultOgImage: "/og-default.jpg",
  author: "SportlyRadar",
};

const SEO = ({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage,
  author,
  noIndex = false,
  noFollow = false,
  schema = null,
}) => {
  // ── Resolve Image URL ─────────────────────────────
  const resolveImageUrl = (image) => {
    if (!image) {
      return `${SEO_CONFIG.siteUrl}${SEO_CONFIG.defaultOgImage}`;
    }

    // Already full URL
    if (
      image.startsWith("http://") ||
      image.startsWith("https://") ||
      image.startsWith("data:")
    ) {
      return image;
    }

    // Local upload path
    if (image.startsWith("/")) {
      return `${VITE_BACKEND_URL}${image}`;
    }

    return `${VITE_BACKEND_URL}/${image}`;
  };

  // ── Final SEO Values ─────────────────────────────
  const seoTitle = title || SEO_CONFIG.defaultTitle;

  const seoDescription =
    description || SEO_CONFIG.defaultDescription;

  const seoKeywords = Array.isArray(keywords)
    ? keywords.join(", ")
    : keywords || SEO_CONFIG.defaultKeywords.join(", ");

  const seoCanonical =
    canonicalUrl || SEO_CONFIG.siteUrl;

  const seoOgImage = resolveImageUrl(
    ogImage || SEO_CONFIG.defaultOgImage
  );

  const seoAuthor = author || SEO_CONFIG.author;

  const robotsContent = `${noIndex ? "noindex" : "index"},${noFollow ? "nofollow" : "follow"}`;

  return (
    <Helmet>
      {/* Basic */}
      <meta charSet="utf-8" />
      <title>{seoTitle}</title>

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />

      <meta
        name="description"
        content={seoDescription}
      />

      <meta name="author" content={seoAuthor} />

      {seoKeywords && (
        <meta
          name="keywords"
          content={seoKeywords}
        />
      )}

      <meta
        name="robots"
        content={robotsContent}
      />

      {/* Canonical */}
      <link
        rel="canonical"
        href={seoCanonical}
      />

      {/* Open Graph */}
      <meta
        property="og:site_name"
        content={SEO_CONFIG.siteName}
      />

      <meta
        property="og:title"
        content={seoTitle}
      />

      <meta
        property="og:description"
        content={seoDescription}
      />

      <meta
        property="og:type"
        content="website"
      />

      <meta
        property="og:url"
        content={seoCanonical}
      />

      <meta
        property="og:image"
        content={seoOgImage}
      />

      {/* Twitter */}
      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={seoTitle}
      />

      <meta
        name="twitter:description"
        content={seoDescription}
      />

      <meta
        name="twitter:image"
        content={seoOgImage}
      />

      {/* Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
    </Helmet>
  );
};

export default SEO;