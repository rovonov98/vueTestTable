const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin }  = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (_, { mode }) => ({
    entry: {
        main: path.join(__dirname, 'src', 'main.js'),
        vendor: path.join(__dirname, 'src', 'vendor.js')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/',
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
        port: 3000,
        // static: true,
        hot: true
    },
    target: mode === 'development' ? 'web' : 'browserslist',
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'Vue app'
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