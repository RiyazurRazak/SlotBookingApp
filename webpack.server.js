const path = require("path")
const dotenv = require('dotenv')
const webpack = require('webpack')
const webpackNodeExternals = require("webpack-node-externals")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin");




const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

module.exports = {
   
    target: "node",
    entry: [ 'regenerator-runtime/runtime',"./server.js"],
    output:{
        filename: "bundle.js",
        path: path.resolve(__dirname, "build"),
        publicPath: "/build"
    },
    plugins:[
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
            options: {
              publicPath: 'public/',
            },
          },
          'css-loader',] 
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                loader: 'file-loader',
                options: {
                outputPath: "public/assets",
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
    externals:[webpackNodeExternals()]
    
  
}