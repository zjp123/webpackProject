const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');//删除那些被定义的对象，但却没有被引用，删除那些对象，减小内存
const HtmlWebpackPlugin = require('html-webpack-plugin');//它的作用默认生成index.html 就算本地有，它会覆盖本地的，并且
//会自动引用输入的所有js或者是其他输出模块

//template 它的作用是以哪个页面为模板 在此基础上  再添加一些功能  有点像jquery中的对象扩展和继承
//devtool  在代码出错时  可以定位到错误在源文件什么地方
module.exports = {
  entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
    devtool: 'cheap-source-map',
    devServer: {
     contentBase: './dist',
     compress: true,
     hot: true
    },
    plugins: [
    //  new HtmlWebpackPlugin({
    //    title: '插件生成的indexHTML1'
    //  }),
    // new CleanWebpackPlugin(['dist']),
    //  new HtmlWebpackPlugin({  // Also generate a test.html
    //    title: '插件生成的WebpackPlugin',
    //   filename: 'WebpackPlugin.html',
    //   template: './dist/first.html'
    // }),
    new UglifyJSPlugin(),
    new webpack.NamedModulesPlugin(),//NamedModulesPlugin，以便更容易查看要修补(patch)的依赖
    new webpack.HotModuleReplacementPlugin(),//webpack提供的热替换，只适用于开发环境
    new webpack.optimize.CommonsChunkPlugin({
       name: 'common' // 指定公共 bundle 的名称。
     })
   ],
   module: {
     rules: [
       {
         test: /\.css$/,
         use: ['style-loader', 'css-loader'],
         include: path.resolve(__dirname, "src"),
         exclude:"/node_modules/"
       },
       {
           test: /\.(png|jpg|jpeg|gif)$/,
           use: ['url-loader?limit=8192'],
       },
       {
           test: /\.(mp4|ogg|svg)$/,
           use: ['file-loader']
       },
       {
           test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
           use: ['url-loader?limit=10000&mimetype=application/font-woff']
       },
       {
           test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
           use: ['url-loader?limit=10000&mimetype=application/octet-stream']
       },
       {
           test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
           use: ['file-loader']
       },
       {
           test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
           use: ['url-loader?limit=10000&mimetype=image/svg+xml']
       }
     ]
   },
   resolve: {
       modules: [
           'node_modules',
           path.resolve(__dirname, 'src')

       ],
       extensions:['.css','.js','jsx']
   },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist'//这是发布路径，当项目引入了图片时候，它可以保证发布时，图片资源不会出错
  }
};
