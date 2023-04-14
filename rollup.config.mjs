import {
  defineConfig
} from 'rollup';
import vue from 'rollup-plugin-vue';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import externalGlobals from 'rollup-plugin-external-globals';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2';
import css from 'rollup-plugin-css-only';

export default defineConfig({
  input: 'src/index.ts',
  output: [{
      file: 'dist/index.js',
      format: 'cjs',
    },
    {
      file: 'dist/index.es.js',
      format: 'es',
    },
  ],
  plugins: [
    vue(),
    resolve(),
    commonjs(),
    json(),
    typescript(),
    css({
      output: 'dist/bundle.css'
    }),
    externalGlobals({
      'ant-design-vue': 'antdVue',
    }),
    peerDepsExternal(),
  ],
  external: ['vue', 'ant-design-vue'],
});