import commonjs from 'rollup-plugin-commonjs';
import resolveModule from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const plugins = [
  resolveModule(),
  commonjs(),
  terser()
];

export default [{
  input: 'src/index.js',
  output: [{
      file: pkg.main,
      format: 'cjs'
    }
  ],
  plugins
}];