const TerserPlugin = require("terser-webpack-plugin");
const path = require('path');

module.exports = {
    entry: './test/indexWillem.js',
    output: {
        filename: 'qh3d-test2.js',
        path: path.resolve(__dirname, 'dist'),
    },
    "mode": "production",
    optimization: {
        minimize: false,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    keep_fnames: true,
                    mangle: {
                        toplevel: true,
                    },
                },
            }),
        ],
    }
};