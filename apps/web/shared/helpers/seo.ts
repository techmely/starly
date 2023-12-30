export const baseSeo = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  publisher: {
    "@type": "Organization",
    name: "Techmely",
    url: "${AppEnv.HOST}",
    logo: {
      "@type": "ImageObject",
      url: "${'/svg/logo.svg'}",
    },
  },
  url: "${AppEnv.HOST}",
  image: {
    "@type": "ImageObject",
    url: "${'/images/Thumbnail.png}",
    width: "THUMBNAIL_WIDTH",
    height: "THUMBNAIL_HEIGHT",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "${AppEnv.HOST}",
  },
  description: "${description}",
};

export const seoMetaHead = [
  {
    name: "viewport",
    content: "width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no",
  },
  {
    hid: "description",
    name: "description",
    content: "Nuxt 3",
  },
  { name: "supported-color-schemes", content: "light dark" },
  { name: "color-scheme", content: "dark" },
  { name: "theme-color", content: "" },
  { name: "google", content: "" },
  { name: "", content: "notranslate" },
  {
    name: "copyright",
    content: "Techmely - Nơi tạo ra những tập thể đứng đầu thế giới",
  },
  {
    name: "author",
    content: "Techmely - Nơi tạo ra những tập thể đứng đầu thế giới",
  },
  {
    name: "generator",
    content: "Techmely - Nơi tạo ra những tập thể đứng đầu thế giới",
  },
  { name: "", content: "" },
  { name: "", content: "" },
  { name: "", content: "" },
  { name: "", content: "" },
  { name: "", content: "" },
  {
    "http-equiv": "Accept-CH",
    content: "Accept, DPR, Viewport-Width, ECT, Width, Save-Data",
  },
  { charset: "utf-8" },
  { name: "msapplication-Config", content: "/favicons/browserconfig.xml" },
];

export const seoLinkHead = [
  {
    id: "favicon",
    rel: "shortcut icon",
    type: "image/x-icon",
    href: "/favicons/favicon-dark.ico",
    "data-href-light": "/favicons/favicon-light.ico",
    "data-href-dark": "/favicons/favicon-dark.ico",
  },
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/favicons/apple-touch-icon.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicons/favicon-16x16.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicons/favicon-32x32.png",
  },
  {
    id: "manifest",
    rel: "manifest",
    href: "/favicons/site-dark.webmanifest",
    "data-manifest-href-light": "/favicons/site-light.webmanifest",
    "data-manifest-href-dark": "/favicons/site-dark.webmanifest",
  },
  { rel: "mask-icon", href: "/favicons/favicon-32x32.svg", color: "#21C3A9" },
];
