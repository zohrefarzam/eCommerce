import type { NextConfig } from 'next';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Directory containing this config (`apps/frontend`). */
const appDir = dirname(fileURLToPath(import.meta.url));
/** Monorepo root (`eCommerce/`) — avoids Turbopack picking a parent `pnpm-workspace.yaml` (e.g. under `$HOME`). */
const turbopackRoot = resolve(appDir, '..', '..');

const nextConfig: NextConfig = {
  turbopack: {
    root: turbopackRoot,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    qualities: [100, 90, 75],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
