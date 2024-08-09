import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.ts',
  external: [],
  output: {
    dir: '.',
    format: 'es',
  },
  plugins: [typescript({ module: 'esnext' }), resolve(), commonjs({ extensions: ['.js', '.ts'] }), terser()],
};
