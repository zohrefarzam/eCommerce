import type { NextConfig } from "next";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/** Directory containing this config (`apps/frontend`). */
const appDir = dirname(fileURLToPath(import.meta.url));
/** Monorepo root (`eCommerce/`) — avoids Turbopack picking a parent `pnpm-workspace.yaml` (e.g. under `$HOME`). */
const turbopackRoot = resolve(appDir, "..", "..");

const nextConfig: NextConfig = {
  turbopack: {
    root: turbopackRoot,
  },
};

export default nextConfig;
