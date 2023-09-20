import { getAuthenticators } from "$webauthn";
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const { username } = ctx.params;
    const userAuthenticators: any[] = await getAuthenticators(username);
    return new Response(JSON.stringify({exists: userAuthenticators.length !== 0}));
  },
};