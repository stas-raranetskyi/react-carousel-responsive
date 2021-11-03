const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDemo = process.env.NODE_ENV === 'demo';
const entryFolder = isProd ? 'src' : 'demo';

module.exports = {
    entry: `./${entryFolder}/index`,
    output: {
        path: isDemo ? path.join(__dirname, '/docs') : path.join(__dirname, '/dist'),
        filename: 'index.js',
        clean: true,
        libraryTarget: isProd && !isDemo ? 'commonjs2' : undefined
    },
    devServer: {
        open: true,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader'
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
    plugins: isProd && !isDemo ? [
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
    externals: isProd && !isDemo ? [
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
