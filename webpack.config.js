const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: [
        './client/index.js'
     ], //this is where webpack looks for the root client/index.js
    output: {
        path: path.resolve(__dirname, 'dist'), // dist is common practice
        publicPath: '/', // this means it starts at the simplest version of the url
        filename: 'bundle.js' // what the bundle file will be called
    },
    plugins: [new HtmlWebpackPlugin({
        template: './client/index.html'
    })], // the plugin generates a new HTML5 file for you with all your wepback bundles using script tags
    resolve: {
        // Enable importing JS / JSX files without specifying their extension
        extensions: ['.js', '.jsx'],
      },
    mode: 'development',
    devServer: {
        host: 'localhost',
        port: 8090,
        static: {
            directory: path.join(__dirname, '/dist'),
            publicPath: '/build/bundle.js'
        },
        hot: true,
        proxy: {
            '/api/**': {
                target: 'http://localhost:3001/',
                secure: false,
              },
        }
    },
    module: {
        // rules and properties for how to deal with our files
        rules: [
            {
                test: /\.jsx?/, // this is a regex expression and it's checking if the file is jsx
                exclude: /node_modules/, // you don't want to bundle any of those files
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }],
                            ['@babel/preset-react', { targets: "defaults" }]
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    // creates style nodes from JS strings - ORDER MATTERS!
                    // these loaders are used in backwards order
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
};

// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const path = require('path');

// module.exports = {
//     entry: [
//         './client/index.js'
//      ], //this is where webpack looks for the root client/index.js
//     output: {
//         path: path.resolve(__dirname, 'dist'), // dist is common practice
//         publicPath: '/', // this means it starts at the simplest version of the url
//         filename: 'bundle.js' // what the bundle file will be called
//     },
//     plugins: [new HtmlWebpackPlugin({
//         template: './client/index.html'
//     })], // the plugin generates a new HTML5 file for you with all your wepback bundles using script tags
//     resolve: {
//         // Enable importing JS / JSX files without specifying their extension
//         extensions: ['.js', '.jsx'],
//       },
//     mode: 'development',
//     devServer: {
//         host: 'localhost',
//         port: 8080,
//         static: {
//             directory: path.join(__dirname, '/dist'),
//             publicPath: '/build/bundle.js'
//         },
//         hot: true,
//         proxy: {
//             '/api/**': {
//                 target: 'http://localhost:3001/',
//                 secure: false,
//               },
//         }
//     },
//     module: {
//         // rules and properties for how to deal with our files
//         rules: [
//             {
//                 test: /\.jsx?/, // this is a regex expression and it's checking if the file is jsx
//                 exclude: /node_modules/, // you don't want to bundle any of those files
//                 use: {
//                     loader: 'babel-loader',
//                     options: {
//                         presets: [
//                             ['@babel/preset-env', { targets: "defaults" }],
//                             ['@babel/preset-react', { targets: "defaults" }]
//                         ]
//                     }
//                 }
//             },
//             {
//                 test: /\.css$/,
//                 exclude: /node_modules/,
//                 use: [
//                     // creates style nodes from JS strings - ORDER MATTERS!
//                     // these loaders are used in backwards order
//                     'style-loader',
//                     'css-loader',
//                 ]
//             },
//         ]
//     },
// };