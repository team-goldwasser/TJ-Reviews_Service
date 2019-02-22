module.exports = {
  entry: {
    index: __dirname + '/client/src/index.jsx'
  },
  module: {
    rules: [
      { 
        test: [/\.jsx?$/],
        exclude: /node_modules/,
        resolve: {
          extensions: ['.js', '.jsx']
        },
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      }
    ]
  },
   output: {
    filename: 'bundle.js',
    path: __dirname + '/client/dist'
  }
};