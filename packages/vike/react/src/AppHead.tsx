import type { TemplateWrapped } from "vike/dist/esm/node/runtime/html/renderHtml";
import { escapeInject } from "vike/server";
import type { PageContext } from "vike/types";

const robotsMap = ({ follow, index }: HeadMetaRobots) => ({
  index: index ? "follow" : "noindex",
  follow: follow ? "follow" : "nofollow",
});

function generateAppHead(pageContext: PageContext): TemplateWrapped {
  const head = pageContext.config.Head || pageContext.Head || {};
  const title = head?.title || "Make your dream come true - Techmely";
  const description = head?.description || "Create the talents - To the path of liberation";

  const robots = Object.values(robotsMap(head?.robots || ({} as HeadMetaRobots))).join(",");

  const canonical = head?.canonical;
  const thumbnail =
    head?.thumbnail ||
    "https://raw.githubusercontent.com/harrytran998/techmely/main/apps/public/thumbnail.web";

  const appHead = escapeInject`
    <meta charset="UTF-8" />
    <title>${title}</title>
    <meta name="description" content=${description} />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    />
    <meta name="robots" content="${robots}" />
    ${canonical ? '<link rel="canonical" href="${canonical}" />' : ""}
    <meta http-equiv="Accept-CH" content="Accept, DPR, Viewport-Width, ECT, Width, Save-Data" />
    <meta name="supported-color-schemes" content="light dark" />
    <meta name="color-scheme" content="light" />
    <meta name="theme-color" content="rgb(250, 250, 250)" />
    <meta name="google" content="notranslate" />

    <link id="favicon" rel="shortcut icon" href="/favicons/favicon-light.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="favicons/favicon-16x16.png" />
    <link id="manifest" rel="manifest" href="/favicons/site-light.webmanifest" />
    <link rel="mask-icon" href="/favicons/favicon-32x32.svg" color="#21C3A9" />
    <meta name="msapplication-config" content="favicons/browserconfig.xml" />

    <meta property="og:type" content="website" />
    ${canonical ? `<meta property="og:url" content="${canonical}" />` : ""}
    <meta property="og:site_name" content="Techmely" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${thumbnail}" />
    
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="twitter:site" content="@techmely" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${thumbnail}" />
    
    <script type="application/ld+json">
{"@context": "https://schema.org",
  "@type": "Organization",
  "name": "Techmely",
  "url": "https://techmely.vn",
  "logo": "https://techmely.vn/logo.png",
  "sameAs": ["https://www.facebook.com/techmely"]
}
    </script>
    `;
  return appHead;
}

export default generateAppHead;
