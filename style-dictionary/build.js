const styleDictionary = require("style-dictionary");
const { transform } = require("@divriots/style-dictionary-to-figma");

const buildPath = "style-dictionary/dist/";
const brands = ["inca", "szv"];
const platforms = ["figmaTokensPlugin", "css", "scss", "js"];

const getConfigFor = (brand, platform) => ({
  source: [
    `style-dictionary/tokens/brands/${brand}/**/*.json`,
    "style-dictionary/tokens/globals/**/*.json",
    `style-dictionary/tokens/platforms/${platform}/**/*.json`,
  ],
  format: {
    figmaTokensPlugin: ({ dictionary }) => {
      const result = transform(dictionary.tokens);
      return JSON.stringify(result, null, 2);
    },
  },
  platforms: {
    figmaTokensPlugin: {
      transformGroup: "js",
      buildPath: `${buildPath}/figma/${brand}/`,
      files: [
        {
          destination: "tokens.json",
          format: "figmaTokensPlugin",
        },
      ],
    },
    css: {
      transformGroup: "css",
      buildPath: `${buildPath}/web/${brand}/`,
      files: [
        {
          destination: "variables.css",
          format: "css/variables",
        },
      ],
    },
    scss: {
      transformGroup: "scss",
      buildPath: `${buildPath}/web/${brand}/`,
      prefix: "token",
      files: [
        {
          destination: "_variables.scss",
          format: "scss/variables",
        },
      ],
    },
    js: {
      transformGroup: "js",
      buildPath: `${buildPath}/web/${brand}/`,
      files: [
        {
          destination: "variables.js",
          format: "javascript/es6",
        },
      ],
    },
  },
});

console.log("%c Building tokens for:", "background: #003153; color: #FFFFFF");
brands.map((brand) => {
  console.log(`%c \n${brand}: `, "background: #003153; color: #FFFFFF");
  platforms.map((platform) => {
    const instance = styleDictionary.extend(getConfigFor(brand, platform));
    instance.buildPlatform(platform);
  });
});
console.log("%c \nBuild completed!", "background: #003153; color: #00FF00");
