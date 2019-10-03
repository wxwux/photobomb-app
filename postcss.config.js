module.exports = {
  syntax: "postcss-scss",
  parser: 'postcss-scss',
  plugins: [
    require("postcss-easy-import")({
      extensions: ".pcss"
    }),
    require("autoprefixer"),
    require("postcss-advanced-variables")({
      variables: require("./resources/frontend/styles/variables")
    }),
    require("postcss-property-lookup"),
    require("postcss-nested"),
    require("postcss-preset-env"),
    require("postcss-rgb"),
    require("postcss-inline-svg")({
      removeFill: true,
      paths: ["./resources/frontend/assets/img"]
    }),
    require("postcss-svgo"),
    require("postcss-pxtorem")({
      rootValue: 16,
      propList: ["*", "!*border*"],
      selectorBlackList: [/^html$/]
    })
  ]
};
