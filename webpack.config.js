const path = require("path");

module.exports = {
  // 入口
  entry: "./src/index.js",
  // 出口
  output: {
    // 用于给生成的静态资源路径添加前缀
    publicPath: "xuni",
    filename: "bundle.js",
  },
  devServer: {
    port: 8080,
    // 指定一个虚拟路径来让devServer服务器提供内容，即index.html的所在目录
    contentBase: "www",
  },
};
