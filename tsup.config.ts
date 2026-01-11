import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    splitting: true,
    sourcemap: true,
    clean: true,
    treeshake: true,
    external: [
      'react',
      'react-dom',
      'react-hook-form',
      'recharts',
    ],
    esbuildOptions(options) {
      options.banner = {
        js: '"use client";',
      };
    },
  },
  {
    entry: ['tailwind/preset.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    outDir: 'dist/tailwind',
    clean: false,
    external: ['tailwindcss', 'tailwindcss-animate'],
  },
]);
