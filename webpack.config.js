const path = require('path');

module.exports = {
    mode: "development",
    entry: "./wwwroot/vue/app.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
}