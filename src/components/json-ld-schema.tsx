export function JsonLdSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://mymevert.id/#website",
        url: "https://mymevert.id",
        name: "MYMevert",
        description: "Free YouTube to MP4 and MP3 Converter",
        publisher: {
          "@id": "https://mymevert.id/#organization",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://mymevert.id?s={search_term_string}",
          },
          query_input: "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://mymevert.id/#organization",
        name: "MYMevert",
        url: "https://mymevert.id",
        description: "Free YouTube to MP4 and MP3 Converter",
        logo: {
          "@type": "ImageObject",
          url: "https://mymevert.id/logo.png",
          width: 256,
          height: 256,
        },
        sameAs: [],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Customer Support",
          url: "https://mymevert.id",
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://mymevert.id/#app",
        name: "MYMevert",
        description: "Free YouTube to MP4 and MP3 Converter",
        url: "https://mymevert.id",
        applicationCategory: "UtilityApplication",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          ratingCount: "1000",
          bestRating: "5",
          worstRating: "1",
        },
      },
    ],
  };

  return (
    <script
      id="json-ld-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}