import type { GatsbyConfig } from "gatsby";

require("dotenv").config({
  path: `.env`,
})

const config: GatsbyConfig = {
  
  siteMetadata: {
    title: `SVW.de`,
    siteUrl: `https://www.yourdomain.tld`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-postcss", "gatsby-plugin-image", "gatsby-plugin-mdx", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }, {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "pages",
        "path": "./src/pages/"
      },
      __key: "pages"
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_API_KEY, // may instead specify via env, see below
        concurrency: 5, // default, see using markdown and attachments for more information
        tables: [
          //{
          //  baseId: `appYUXJqYpIFiwBTa`,
          //  tableName: `players`
          //},
          //{
          //  baseId: `appYUXJqYpIFiwBTa`,
          //  tableName: `games`
          //},
          {
            baseId: `appYUXJqYpIFiwBTa`,
            tableName: `stats`
          },
          {
            baseId: `appYUXJqYpIFiwBTa`,
            tableName: `seasons`
          }
        ]
      }
    }
  ]
};

export default config;
