/**
 * @author: heliang
 * @date: 2017/1/13
 */
let path=require("path");
let fs=require("fs");
require('babel-register');
let webpack=require('webpack');
let {env,templateName}=require("./server/config");
let HtmlWebpackPlugin=require("html-webpack-plugin");
var ExtractTextPlugin=require("extract-text-webpack-plugin");
var CommonsChunkPlugin=webpack.optimize.CommonsChunkPlugin;
let reactPath=path.join(__dirname,"./node_modules/react/dist/react.js");
let reactDomPath=path.join(__dirname,'./node_modules/react-dom/dist/react-dom.js');
console.log("生产环境...");

console.log("文件生成目录："+path.resolve(__dirname,'build/production'));

let clientConfig={
    entry:{
        app:path.resolve(__dirname,'src/app.js'),
        libs:['react','react-dom','react-router','react-redux','isomorphic-fetch']
    },
    output:{
        path:path.resolve(__dirname,'build/production'),
        publicPath: '/',
        filename:'[name].js?[hash]'
    },
    resolve:{
        extensions:['','.js','.css','.jsx']
    },
    module:{
        loaders:[
            {
                test:/\.js$/,
                loaders:['babel'], //'react-hot',
                exclude:path.resolve(__dirname,'node_modules')
            },
            { test: /\.css$/,
                //将分散的css合并
                loader: ExtractTextPlugin.extract("style", "css")
            },{
                test:/\.json$/,
                loader:'json'
            },{
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                loader: 'url-loader?limit=1&name=assets/images/[name].[ext]?[hash]'
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
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'template/index.ejs'),
            filename:templateName+'.html',
            title:'生产环境'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        //合并第三方代码
        new CommonsChunkPlugin({
            name:"libs",
            filename:"libs.js?[hash]",
            minChunks:Infinity
        }),
        //压缩时去掉警告
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                // remove all comments(注释)
                comments: false
            }
        }),
        //合并css
        new ExtractTextPlugin("[name].css?[hash]",{
            allChunks:true
        }),
        new webpack.NoErrorsPlugin()
    ]
}


function getExternals() {
    return fs.readdirSync(path.resolve(__dirname, './node_modules'))
        .filter(filename => !filename.includes('.bin'))
        .reduce((externals, filename) => {
            externals[filename] = `commonjs ${filename}`

            return externals
        }, {})
}

let serverConfig = {
    entry: {
        app:path.resolve(__dirname,'server/app.js')
    },
    output: {
        path: path.resolve(__dirname, 'build/server'),
        filename: '[name].js',
        chunkFilename: 'chunk.[name].js?[hash]'
    },
    target: 'node',
    node: {
        __filename: true,
        __dirname: true
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        }, {
            test: /\.css/,
            loaders: [
                'css/locals',
            ]
        },{
            test: /\.(png|jpe?g|gif)(\?.*)?$/,
            loader: 'url-loader?limit=1&name=assets/images/[name].[ext]?[hash]'
        }, {
            test: /\.json$/,
            loader: 'json'
        }]
    },
    externals: getExternals(),
    resolve: {extensions: ['', '.js', '.json', '.css']},
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            comments: false
        }),
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(env)})
    ]
}



module.exports=[clientConfig,serverConfig]


