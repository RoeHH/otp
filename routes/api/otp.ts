import { WithSession } from "$fresh-session";
import { Handlers } from "$fresh/server.ts";
import { getOtpUris } from "$otp"

export const handler: Handlers<{}, WithSession> = {
  GET(req, ctx) {
    const { session } = ctx.state;
    console.log(session.get("user"));
    console.log(getOtpUris(session.get("user").username));
    
    
    return new Response(JSON.stringify(getOtpUris(session.get("user").username)));
  }
};