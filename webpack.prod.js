const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');//删除那些被定义的对象，但却没有被引用，删除那些对象，减小内存
const HtmlWebpackPlugin = require('html-webpack-plugin');//它的作用默认生成index.html 就算本地有，它会覆盖本地的，并且
//会自动引用输入的所有js或者是其他输出模块
const CleanWebpackPlugin = require('clean-webpack-plugin');

//template 它的作用是以哪个页面为模板 在此基础上  再添加一些功能  有点像jquery中的对象扩展和继承
//devtool  在代码出错时  可以定位到错误在源文件什么地方
module.exports = {
  entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
    devtool: 'source-map',
    devServer: {
     contentBase: './dist',
     hot: true
    },
    plugins: [
    //  new HtmlWebpackPlugin({
    //    title: '插件生成的indexHTML1'
    //  }),
    new CleanWebpackPlugin(
      ['dist/app.bundle.js.map','dist/print.bundle.js.map',],　 //匹配删除的文件  删除重复文件
      {
          root: __dirname,       　　　　　　　　　　//根目录
          verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
          dry:      false        　　　　　　　　　　//启用删除文件
      }
    ),
    //  new HtmlWebpackPlugin({  // Also generate a test.html
    //    title: '插件生成的WebpackPlugin',
    //   filename: 'WebpackPlugin.html',
    //   template: './dist/first.html'
    // }),
    new webpack.DefinePlugin({
       'process.env': {
         'NODE_ENV': JSON.stringify('production')//用于决定在开发环境与生产环境(dev-vs-prod)下，服务器工具、构建脚本和客户端 library 的行为
       }
     }),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.NamedModulesPlugin(),//NamedModulesPlugin，以便更容易查看要修补(patch)的依赖
    new webpack.HotModuleReplacementPlugin()//webpack提供的热替换，只适用于开发环境
   ],
   module: {
     rules: [
       {
         test: /\.css$/,
         use: ['style-loader', 'css-loader'],
         include: path.resolve(__dirname, "src")
       }
     ]
   },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
