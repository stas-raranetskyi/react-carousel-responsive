const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';
const entryFolder = isProd ? 'src' : 'demo';

module.exports = {
    entry: `./${entryFolder}/index`,
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index.js',
        libraryTarget: isProd ? 'commonjs2' : undefined
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    devtool: 'declaration-map',
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true,
                            reloadAll: true,
                        },
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },
        ]
    },
    plugins: isProd ? [
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        })
    ] : [
        new HtmlWebpackPlugin({
            template: './demo/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        })
    ],
    externals: isProd ? [
        // nodeExternals(),
        {
          react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
          },
          'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
          }
        }
    ] : []
};
