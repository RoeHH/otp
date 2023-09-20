import "https://deno.land/std@0.201.0/dotenv/load.ts";
export const kv = await Deno.openKv(Deno.env.get("DENO_KV_URL"));