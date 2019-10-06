const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    entry: {
        main: './src/js/index.js',
        about: './src/js/about.js',
        analytics: './src/js/analytics.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[chunkhash].js'
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-env"],
                plugins: ["@babel/plugin-proposal-class-properties"]
            }
        },
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        },
                    },

                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: __dirname + '/postcss.config.js'
                            }
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|ico|svg)$/,
                use:
                    [
                        'file-loader?name=./images/[name].[ext]',
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                mozjpeg: {
                                    progressive: true,
                                    quality: 65
                                },
                                pngquant: {
                                    quality: [0.65, 0.90],
                                    speed: 4
                                },
                            }
                        }
                    ],
            },
            {
                test: /\.(eot|ttf|woff|woff2|otf)$/,
                loader: 'file-loader?name=./vendor/[name].[ext]'
            },

        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './css/[name].[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/about.html',
            filename: 'about.html'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/analytics.html',
            filename: 'analytics.html'
        }),
        new WebpackMd5Hash(),
        new CopyWebpackPlugin([{
            from: './src/images/placeholder-image.png',
            to: 'images'
        }]),
    ]
};