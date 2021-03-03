const path = require("path");
const common = require("./webpack.common");
const {merge} = require("webpack-merge");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
    mode : "production",
    output: {
        filename: "main.[contenthash].js",
        path: path.resolve(__dirname, "dist")
    },
    optimization: {
        minimizer:[
            new OptimizeCssAssetsPlugin(), 
            new TerserPlugin(), 
            new HtmlWebpackPlugin({
                template: "./src/template.html",
                minify: {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true
                }
            })]
    },
    plugins: [
        new MiniCssExtractPlugin({filename: "[name].[contenthash].css"}), 
        new CleanWebpackPlugin()
        
    ],
    module:{
        rules: [
            {
                test: /\.scss$/,
                use: [
                MiniCssExtractPlugin.loader, //extract css into files
                "css-loader", //turns css into commonjs
                "sass-loader"//turns sass into css
                ]
            },
        ]
    }
});