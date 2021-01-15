import buble from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: 'src/index.js',
  external: ['harlan', 'jquery', 'numeral'],
  output: {
    file: 'index.js',
    name: 'HarlanIChequesRefin',
    format: 'iife',
    globals: {
      numeral: 'numeral',
      harlan: 'harlan',
      jquery: '$',
    },
  },
  plugins: [
    resolve(),
    commonjs(),
    buble({transforms: { asyncAwait: false }}),
    uglify(),
  ],
};
