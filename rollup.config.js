import buble from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/index.js',
  external: ['harlan', 'jquery'],
  output: {
    file: 'index.js',
    name: 'HarlanIChequesRefin',
    format: 'iife',
    globals: {
      harlan: 'harlan',
      jquery: '$',
    },
  },
  plugins: [
    resolve(),
    commonjs(),
    buble(),
  ],
};
