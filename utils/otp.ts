import { kv } from "./kv.ts";

export async function getOtpUris(userId: string): Promise<string[]> {
  const iter = kv.list<string>({ prefix:["otps", userId] });
  const otps = [];
  for await (const res of iter) otps.push(res.value);
  return otps;
}

export async function createOtpUri(userId: string, otpUri: string): Promise<void> {
  await kv.set(["otps", userId, crypto.randomUUID()], otpUri);
}