const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, "./wwwroot/js/site.js"),
    output: {
        path: path.resolve(__dirname, './wwwroot/js/'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
              test: /\.vue$/,
              loader: 'vue-loader'
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            }
          ]
    },
    resolve: {
        extensions: ["*", ".js"]
    },
    plugins: [
        // make sure to include the plugin!
        new VueLoaderPlugin()
      ]
}