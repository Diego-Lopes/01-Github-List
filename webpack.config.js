//importar path para ajustar a barra de acordo do sistema operacional.

const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ReactRefrshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";
module.exports = {
  mode: isDevelopment ? "development" : "production",
  devtool: isDevelopment ? "eval-source-map" : "source-map",
  entry: path.resolve(__dirname, "src", "index.tsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
    hot: true,
  },
  plugins: [
    isDevelopment && new ReactRefrshWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ].filter(Boolean), //esse "hackzinho permite usarmos declarações true e false. como está no isDevelopment."
  module: {
    rules: [
      {
        test: /\.(j|t)sx$/, //expressão regular
        exclude: /node_modules/, //excluir pasta node da execução.
        use: {
          //converter o conteudo em que o browser entenda.
          loader: "babel-loader",
          options: {
            plugins: [
              isDevelopment && require.resolve("react-refresh/babel"),
            ].filter(Boolean),
          },
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/, //excluir
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
