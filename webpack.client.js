const path = require("path")
const dotenv = require('dotenv')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin");



const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

module.exports = {

    
    target: "node",
    entry: [ 'regenerator-runtime/runtime',"./src/index.js"],
    output:{
        filename: "client_bundle.js",
        path: path.resolve(__dirname, "build/public"),
        publicPath: "/build/public"
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: 'client_bundle.css',
          chunkFilename: '[id].[contenthash].css',
          linkType: 'text/css',
        }),
        new webpack.DefinePlugin(envKeys)
      ],
    module:{
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude:"/node_modules/",
                options:{
                    presets:[
                        "@babel/react",
                        ["@babel/env",{
                            targets:{"browsers" :["last 2 versions"]}
                        }]
                    ],
                    
                }
            },
            {
                test: /\.css?$/,
                use:[{
                    loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',] 
            },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    loader: 'file-loader',
                    options: {
                    outputPath: "/assets",
                    publicPath: '../assets/',
                    },
                  },
                 
               
            ]
    },
    optimization: {
        minimize: true,
        minimizer: [
        
          new CssMinimizerPlugin({
              cache:true,
          }),
          new TerserPlugin()

        ],
      },

}