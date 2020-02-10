// https://github.com/michael-ciniawsky/postcss-load-config

// module.exports = {
//   'plugins': {
//     // to edit target browsers: use "browserslist" field in package.json
//     'autoprefixer': {}
//   }
// }
module.exports = {

  plugins: {

    autoprefixer: {},

    'postcss-px2rem-exclude': {

      remUnit: 54,

      exclude: /node_modules|folder_name/i

    }

  }

}
