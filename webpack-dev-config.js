/**
 * @author: heliang
 * @date: 2017/1/13
 */
let path=require("path");

let webpack=require('webpack');
var ExtractTextPlugin=require("extract-text-webpack-plugin");
//开发环境下使用
let OpenBrowserWebpackPlugin=require("open-browser-webpack-plugin");
let HtmlWebpackPlugin=require("html-webpack-plugin");
var CommonsChunkPlugin=webpack.optimize.CommonsChunkPlugin;
let reactPath=path.join(__dirname,"./node_modules/react/dist/react.js");
let reactDomPath=path.join(__dirname,'./node_modules/react-dom/dist/react-dom.js');
require('babel-register');
let {env,conf,templateName}=require("./server/config");
let port=conf.port||3000;
console.log("开发环境...");
module.exports={
    entry:{
        app:path.resolve(__dirname,'src/app.js')
    },
    output:{
        path:path.resolve(__dirname,'build/'+env),
        publicPath: '/',
        filename:'[name].js?[hash]'
    },
    devtool:"eval-source-map",
    resolve:{
       extensions:['','.js','.css','.jsx']
    },
    module:{
        loaders:[
            {
             test:/\.js$/,
             loaders:['babel'],
             exclude:path.resolve(__dirname,'node_modules')
            },{
             test:/\.css$/,
            //将分散的css合并
            loader: ExtractTextPlugin.extract("style", "css")
            },{
             test:/\.json$/,
             loader:'json'
            },{
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url?limit=5000&name=assets/images/[name].[ext]'
            },{
              test:/\.(woff|woff2|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
              loader:'url?limit=1000&name=assets/font/[name].[ext]'
            },{
                test: /\.html$/,
                loader: 'html',
                query: {
                    minimize: true
                }
            }
        ],
        noParse:[reactPath,reactDomPath]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserWebpackPlugin({
            url:"http://localhost:"+port+"/"
        }),
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'template/index.ejs'),
            filename:templateName+'.html',
            title:'开发环境'
        }),
        //合并第三方代码
        // new CommonsChunkPlugin({
        //     name:"commons",
        //     filename:"commons.js?[hash]",
        //     minChunks:Infinity
        // }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./vendor-manifest.json')
        }),
        // //压缩时去掉警告
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     },
        //     output: {
        //         // remove all comments(注释)
        //         comments: false
        //     }
        // }),
        //合并css
        new ExtractTextPlugin("[name].css?[hash]",{
            allChunks:true
        }),
        
        new webpack.NoErrorsPlugin()
    ]
}