import path from 'path';

import { Configuration } from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const config: Configuration = {
    mode: 'development',

    target: 'web',

    node: {
        __dirname: false,
        __filename: false,
    },

    entry: {
        app: './src/web/index.tsx',
    },

    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: './',
        filename: '[name].js',
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true },
                    }
                ]
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin(),

        new HtmlWebpackPlugin({
            template: './src/web/index.html',
            filename: 'index.html',
            scriptLoading: 'blocking',
            inject: 'body',
            minify: false
        }),
    ],

    devtool: 'inline-source-map',
}

export default config;
