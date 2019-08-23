import copier from 'rollup-plugin-copier';
import livereload from 'rollup-plugin-livereload';
import resolveModule from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import serve from 'rollup-plugin-serve';
import { terser } from 'rollup-plugin-terser';
import path from 'path';
import { writeFileSync } from 'fs';

import pkg from './package.json';

const plugins = [
  resolveModule(),
  typescript()
];

const iife = {
  input: 'src/index.ts',
  output: { file: `dist/${pkg.browser}`, format: 'iife', name: 'blinkTwo' },
  plugins: [ ...plugins, terser() ]
};

const completeBuilds = [];

if (process.env.PROD === 'true') {
  completeBuilds.push({
    input: 'src/index.ts',
    output: [
      { file: `dist/${pkg.main}`, format: 'cjs' },
      { file: `dist/${pkg.module}`, format: 'es' }
    ],
    plugins: [
      ...plugins,
      copier({
        items: [
          { src: 'CHANGELOG.md', dest: 'dist/CHANGELOG.md', createPath: true },
          { src: 'LICENSE.md', dest: 'dist/LICENSE.md', createPath: true },
          { src: 'package-lock.json', dest: 'dist/package-lock.json', createPath: true },
          { src: 'README.md', dest: 'dist/README.md', createPath: true }
        ]
      }),
      (() => ({
        writeBundle: () => {
          writeFileSync('./dist/package.json', JSON.stringify({
            ...pkg,
            scripts: { }
          }));
        }
      }))()
    ]
  });
} else if (process.env.WATCH === 'true') {
  iife.plugins.push(copier({ items: [{ src: 'src/index.html', dest: 'dist/index.html', createPath: true }] }));
  iife.plugins.push(serve({ open: true, contentBase: 'dist', port: 3000 }));
  iife.plugins.push(livereload({ watch: [path.resolve(__dirname, 'dist')], exts: ['html', 'js', 'scss', 'css'] }));
}

completeBuilds.push(iife);

export default completeBuilds;