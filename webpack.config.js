const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        index: "./public/js/index.js",
    },
    devtool: "inline-source-map",
    output: {
        path: path.resolve("./dist"),
        filename: "[name]_bundle.js",
    },
};