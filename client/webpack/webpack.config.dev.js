const Path = require("path");
const Webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const clientPath = Path.resolve(__dirname, "../");

module.exports = merge(common, {
    target: "web",
    mode: "development",
    devtool: "eval-cheap-source-map",
    output: {
        chunkFilename: "js/[name].chunk.js",
    },

    devServer: {
        historyApiFallback: true,
        client: {
            logging: "error",
            overlay: true,
        },
        hot: true,
        watchFiles: ["../**/*.html"],
    },
    plugins: [
        new Webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("development"),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: Path.resolve(clientPath, "/src"),
                loader: "babel-loader",
            },
            {
                test: /\.s?css$/i,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
        ],
    },
});
