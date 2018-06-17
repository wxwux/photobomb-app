module.exports = {
  plugins: [
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
      path: "./resources/frontend/assets/img"
    }),
    require("postcss-svgo")
  ]
};
