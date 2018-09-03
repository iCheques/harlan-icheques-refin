import buble from 'rollup-plugin-buble';

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
    buble(),
  ],
};
