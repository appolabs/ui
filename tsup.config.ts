import { defineConfig } from 'tsup';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';

// Per-component entries enable subpath imports: `@appolabs/ui/cookie-banner`
// resolves to `dist/cookie-banner.js` so consumers can import a single
// component without statically pulling the whole barrel index.js (and the
// optional peer deps it references — react-hook-form, recharts).
const componentEntries = Object.fromEntries(
  readdirSync(join(__dirname, 'src/components'))
    .filter((file) => file.endsWith('.tsx'))
    .map((file) => {
      const name = file.replace(/\.tsx$/, '');
      return [name, `src/components/${file}`];
    }),
);

export default defineConfig([
  {
    entry: {
      index: 'src/index.ts',
      ...componentEntries,
    },
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
