import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const basePlugins = [
  resolve(),
  commonjs(),
  typescript({ tsconfig: './tsconfig.json' })
];

export default [
  // UMD builds
  {
    input: 'src/index.ts',
    output: {
      name: 'UserDNACommunity',
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
      exports: 'auto'
    },
    plugins: basePlugins
  },
  {
    input: 'src/index.ts',
    output: {
      name: 'UserDNACommunity',
      file: pkg.browser.replace('.js', '.min.js'),
      format: 'umd',
      sourcemap: true,
      exports: 'auto'
    },
    plugins: [...basePlugins, terser()]
  },
  // ESM build
  {
    input: 'src/index.ts',
    output: {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      exports: 'named'
    },
    plugins: basePlugins
  },
  {
    input: 'src/index.ts',
    output: {
      file: pkg.module.replace('.js', '.min.js'),
      format: 'es',
      sourcemap: true,
      exports: 'named'
    },
    plugins: [...basePlugins, terser()]
  },
  // CJS build
  {
    input: 'src/index.ts',
    output: {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    },
    plugins: basePlugins
  },
  {
    input: 'src/index.ts',
    output: {
      file: pkg.main.replace('.js', '.min.js'),
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    },
    plugins: [...basePlugins, terser()]
  }
]; 