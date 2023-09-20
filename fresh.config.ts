import { defineConfig } from "$fresh/server.ts";

import { kvAdmin } from "https://raw.githubusercontent.com/RoeHH/kv-admin-fresh-plugin/main/mod.ts";

import twindPlugin from "$fresh/plugins/twindv1.ts";
import twindConfig from "./twind.config.ts";

export default defineConfig({plugins: [kvAdmin, twindPlugin(twindConfig)]});
