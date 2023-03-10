// const ExtractTextPlugin = require('extract-text-webpack-plugin') // 提取文件插件
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css文件插件
// const CopyPlugin = require('copy-webpack-plugin') // 拷贝插件
const HtmlWebpackPlugin = require('html-webpack-plugin') // html插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const ESLintPlugin = require('eslint-webpack-plugin')

const path = require('path')

module.exports = {
  entry: {
    camera: './src/js/camera.js',
  }, // 入口
  //开发模式没有输出
  output: {
    path: undefined, // 出口路径
    filename: 'js/[name].js', // 出口文件名
    clean: true,
  },
  devtool: 'source-map', //映射关系，便于找错
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },

          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // 其他选项
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10kb
          },
        },
        generator: {
          filename: 'img/[hash:8][ext][query]',
        },
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
        },
      },
    ],
  },

  plugins: [
    // new ExtractTextPlugin('css/style.[chunkhash:8].css'), // 初始化提取文件插件，css文件名chunkhash防缓存
    // new OptimizeCssAssetsPlugin(), // 初始化压缩css文件插件
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      // 初始化html插件，自动生成<link>和<script>标签
      chunks: ['camera'],
      filename: 'html/line.html',
      template: path.resolve(__dirname, '../src/html/line.html'), // 使用的html模板路径
    }),
    // new HtmlWebpackPlugin({
    //   // 初始化html插件，自动生成<link>和<script>标签
    //   chunks: ['A2_4_Building_Opacity'],
    //   filename: 'html/building/A2_4_Building_Opacity.html',
    //   template: path.resolve(
    //     __dirname,
    //     '../src/html/A2_4_Building_Opacity.html'
    //   ), // 使用的html模板路径
    // }),
    // new HtmlWebpackPlugin({
    //   // 初始化html插件，自动生成<link>和<script>标签
    //   chunks: ['A2_123_Building_Opacity'],
    //   filename: 'html/building/A2_123_Building_Opacity.html',
    //   template: path.resolve(
    //     __dirname,
    //     '../src/html/A2_123_Building_Opacity.html'
    //   ), // 使用的html模板路径
    // }),
    // new HtmlWebpackPlugin({
    //   // 初始化html插件，自动生成<link>和<script>标签
    //   chunks: ['A1_123_Building_Opacity'],
    //   filename: 'html/building/A1_123_Building_Opacity.html',
    //   template: path.resolve(
    //     __dirname,
    //     '../src/html/A1_123_Building_Opacity.html'
    //   ), // 使用的html模板路径
    // }),
    // new HtmlWebpackPlugin({
    //   // 初始化html插件，自动生成<link>和<script>标签
    //   chunks: ['A3_3_Building_Opacity'],
    //   filename: 'html/building/A3_3_Building_Opacity.html',
    //   template: path.resolve(
    //     __dirname,
    //     '../src/html/A3_3_Building_Opacity.html'
    //   ), // 使用的html模板路径
    // }),
    // new HtmlWebpackPlugin({
    //   // 初始化html插件，自动生成<link>和<script>标签
    //   chunks: ['A2_4_Building_Opacity'],
    //   filename: 'html/A2_4_Building_Opacity.html',
    //   template: path.resolve(
    //     __dirname,
    //     '../src/html/A2_4_Building_Opacity.html'
    //   ), // 使用的html模板路径
    // }),

    // new ESLintPlugin({
    //   context: path.resolve(__dirname, '../src'),
    // }),
  ],

  devServer: {
    host: 'localhost',
    port: '3000',
    open: true,
    hot: false,
    static: `./src/`, //允许配置从跟目录下提供静态文件
  },
  mode: 'development',
  // mode: 'production',
}
