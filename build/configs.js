// https://www.rollupjs.com/guide/big-list-of-options
const path = require('path')
const { uglify } = require('rollup-plugin-uglify') // 代码压缩
const { terser } = require('rollup-plugin-terser') // 代码编译
const buble = require('@rollup/plugin-buble') // es6 转 es5
const json = require('@rollup/plugin-json')
const builtins = require('rollup-plugin-node-builtins')
const resolve = require('@rollup/plugin-node-resolve').nodeResolve
const commonjs = require('@rollup/plugin-commonjs')
const server = require('rollup-plugin-serve')
const livereload = require('rollup-plugin-livereload')
const replace = require('@rollup/plugin-replace')
const typescript = require('@rollup/plugin-typescript')
const alias = require('@rollup/plugin-alias')

const debug = process.env.DEBUG || false
const resolves = _path => path.resolve(__dirname, '../', _path)

module.exports = [
  // browser dev
  {
    file: resolves('dist/zsOpenCore.js'),
    format: 'es',
    env: 'dev',
    transpile: false
  },
  {
    file: resolves('dist/zsOpenCore.min.js'),
    format: 'umd',
    env: 'h5',
    transpile: true
  },
  {
    file: resolves(process.env.NODE_ENV !== 'dev' ? 'dist/zsOpenCore.min.wx.js' : '../wxLoginTest/utils/zsOpenCore.min.wx.js'),
    format: 'umd',
    env: 'wx',
    transpile: true
  }
].map(genConfig)

function genConfig(options) {
  const config = {
    input: {
      input: resolves('src/index.js'),
      plugins: [
        alias({
          entries: [
            { find: '@', replacement: 'src' },
          ]
        }),
        replace({
          'process.env.NODE_ENV': JSON.stringify(options.env),
          'process.env.DEBUG': JSON.parse(debug),
          preventAssignment: true
        }),
        json(),
        builtins(),
        typescript(),
        resolve(),
        commonjs(),
        uglify(),
        buble({
          exclude: 'node_modules/**'
        }),
        terser()
      ]
    },
    output: {
      file: options.file,
      format: options.format,
      // banner,
      name: 'ZSOpenCore',
      sourcemap: true
    }
  }

  if (options.env === 'dev') {
    config.input.plugins.push(
      livereload(),
      server({
        // open: true,
        host: 'ncenter.qkagame.net',
        port: 80,
        contentBase: ['examples', 'dist']
      }))
  }

  if (options.transpile !== false) {
    config.input.plugins.push(
      buble({
        exclude: 'node_modules/**'
      })
    )
  }

  return config
}
