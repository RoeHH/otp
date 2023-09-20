import { WithSession } from "$fresh-session";
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers<{}, WithSession> = {
  GET(req, ctx) {
    const { session } = ctx.state;

    session.clear();

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    }); 
  }
};