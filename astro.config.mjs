import { defineConfig } from "astro/config";

// Static site, ready to drop into Hostinger's public_html.
export default defineConfig({
  site: "https://eon.play",
  output: "static",
  build: {
    inlineStylesheets: "auto",
    assets: "_assets",
  },
  compressHTML: true,
});
