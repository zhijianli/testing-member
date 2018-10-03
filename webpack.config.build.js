import path from "path"
import precss from "precss"
import webpack from "webpack"
import autoprefixer from "autoprefixer"
import ExtractTextPlugin from "extract-text-webpack-plugin"

let plugins = [
    new ExtractTextPlugin("mobile.css"),
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendors.js"),
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify('production')
        }

    })
]

export default {

    entry: {
        app: "./src/app.js",
        vendor: ["vue", "vue-router"]
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].js",
        publicPath: "/dist/"
    },
    module: {
        noParse: [/vue-router/],
        loaders: [{
                test: /\.vue$/,
                loader: "vue"
            },
            {
                test: /\.js$/,
                //exclude: /node_modules/,
                exclude: /(node_modules|wySdk)/,
                include: path.resolve(__dirname, "src"),
                loader: "babel?cacheDirectory"
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css!postcss")
            },
            {
                test: /\.(png|jpg|gif|ttf|svg|ico)$/,
                loader: "url-loader",
                query: {
                    name: "[hash].[ext]",
                    limit: 10000,
                }
            },
            {
                test: /\.eot/,
                loader: 'file?prefix=font/'
            },
            {
                test: /\.woff/,
                loader: 'file?prefix=font/&limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf/,
                loader: 'file?prefix=font/'
            },
            {
                test: /\.eot@/,
                loader: 'file?prefix=font/'
            }
        ]
    },
    babel: {
        "plugins": ["transform-async-to-generator", "transform-es2015-modules-commonjs", "transform-runtime"]
    },
    postcss: [
        precss,
        autoprefixer({
            browsers: "> 5%"
        })
    ],
    plugins: plugins,
    resolve: {
        root: path.resolve(__dirname, "node_modules"),
        alias: {
            "vue-router": "vue-router/dist/vue-router.min.js"
        },
        extensions: ["", ".js", ".vue", "css"]
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        proxy: {
            "/testCenter/*": {
                target: "http://192.168.0.247:8000", //35 80
                // target: "http://192.168.0.11:8080",
                secure: false
            },
            "/orderCenter/*": {
                target: "http://192.168.0.247:8000",
                secure: false
            },
            "/depression-web/*": {
                target: "http://192.168.0.103:8088", //247 80  233
                // target: "http://192.168.0.233:8080", //247 80  233
                // target: "http://192.168.0.61:8088", //247 80  233
                // target: "http://192.168.0.83:8090", //247 80  233
                secure: false
            },
            "/depression-netsales/*": {
                target: "http://192.168.0.247:8080", //247 80  233
                secure: false
            },
            "/depression-upload/*": {
                target: "http://192.168.0.247:8080",
                secure: false
            },
        }
    },
    devtool: "source-map"
}
