const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        vendor: ['react','react-dom','redux','react-redux','react-router','isomorphic-fetch'] //'react','react-dom','redux','react-redux','react-router',
    },
    output: {
        path: path.join(__dirname, 'assets/libs'),
        filename: '[name].dll.js',
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '[name]-manifest.json'),
            name: '[name]_library'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
    ]
};