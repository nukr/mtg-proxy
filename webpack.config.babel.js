import path from 'path'

export default {
  entry: path.resolve(__dirname, 'src', 'client', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: './public/build'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style!css'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './public'
  }
}
