const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
const config = {
    target: 'web',
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.styl/,
                use: [//按照顺序一级一级往上返
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap : true,
                        }
                    },
                    'stylus-loader'
                ]
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,//小于1024就会转换为base64代码
                            name: '[name]-d.[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        //在编译过程中判断当前的环境
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new HTMLPlugin()
    ]
}

if(isDev){
    //在页面上调试代码
    config.devtool = '#cheap-module-source-map'
    config.devServer= {
        port: 8001,
        host: '0.0.0.0',
        overlay: {
            errors:true
        },
        hot: true
        // open:true 每次启动webpack会自动打开浏览器
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),//热更新
        new webpack.NoEmitOnErrorsPlugin()
    )
}else {
    // config.entry = {
    //     app: path.join(__dirname,'src/index.js'),
    //     vendor: ['vue']
    // }
    config.output.filename = '[name].[chunkhash:8].js'
    config.module.rules.push(
        {
            test: /\.styl/,
                use: ExtractPlugin.extract({
                    fallback: 'style-loader',
                    use: [//按照顺序一级一级往上返
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap : true,
                            }
                        },
                        'stylus-loader'
                    ]
                })
        },
    )
    config.plugins.push(
        new ExtractPlugin('style.[chunkhash:8].css'),

    )
}

module.exports = config