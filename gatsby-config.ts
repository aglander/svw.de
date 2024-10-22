import type { GatsbyConfig } from "gatsby";

require("dotenv").config({
  path: `.env`,
})

console.log(JSON.stringify(module.exports.headers, null, 2));
console.log(JSON.stringify(process.env, null, 2));

module.exports = {
  headers: [
    {
      source: `/all`,
      headers: [
        {
          key: `X-Frame-Options`,
          value: `ALLOW-FROM https://www.svwoltersdorf.de`,
        }
      ]
    },
  ]
}


console.log(JSON.stringify(module.exports.headers, null, 2));
console.log(JSON.stringify(process.env, null, 2));

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

console.log(JSON.stringify(config, null, 2));

export default config;
