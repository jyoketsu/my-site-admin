const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          modifyVars: {
            "@primary-color": "#005CAF",
            "@layout-header-background": "#0F2540",
          },
          javascriptEnabled: true,
        },
      },
    },
  ],
};
