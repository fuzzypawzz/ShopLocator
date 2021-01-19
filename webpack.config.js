const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: "development",
    entry: "./wwwroot/vue/app.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            // ... other rules
            {
              test: /\.vue$/,
              loader: 'vue-loader'
            }
          ]
    },
    plugins: [
        // make sure to include the plugin!
        new VueLoaderPlugin()
      ]
}