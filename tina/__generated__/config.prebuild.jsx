// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: process.env.VITE_TINA_BRANCH || "main",
  clientId: process.env.VITE_TINA_CLIENT_ID || "",
  token: process.env.VITE_TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Blog Posts",
        path: "content/posts",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            required: true
          },
          {
            type: "image",
            name: "image",
            label: "Cover Image",
            required: true
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true
          },
          {
            type: "object",
            name: "author",
            label: "Author",
            fields: [
              {
                type: "string",
                name: "name",
                label: "Name",
                required: true
              },
              {
                type: "string",
                name: "role",
                label: "Role",
                required: true
              },
              {
                type: "image",
                name: "avatar",
                label: "Avatar",
                required: true
              }
            ]
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            required: true
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            required: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
