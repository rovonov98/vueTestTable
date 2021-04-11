const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin }  = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (_, { mode }) => ({
    entry: {
        main: path.resolve(__dirname, 'src', 'main.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 
        mode === 'production'
        ? '[name].[contenthash].bundle.js'
        : '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    mode === 'production'
                    ? MiniCssExtractPlugin.loader
                    : 'style-loader',
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            additionalData: `
                                @import "src/assets/scss/variables.scss";
                                @import "src/assets/scss/mixins.scss";
                            `
                        }
                    }
                ]
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
        ]
    },
    devServer: {
        port: 8080,
        // static: true,
        contentBase: path.resolve(__dirname, './dist'),
        hot: true
        // hot reload doesn't work
    },
    target: 'web',
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'Vue app',
            template: './index.html',
            // title works only in production
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 
            mode === 'production' 
            ? '[name].[contenthash].bundle.css'
            : '[name].css'
        })
    ],
})