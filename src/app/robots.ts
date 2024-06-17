import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `https://junkyursas.com/sitemap.xml`,
    host: "https://junkyursas.com/",
  };
}
