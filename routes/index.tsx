import WebauthnLoginRegisterIsland from "../islands/WebauthnLoginRegisterIsland.tsx";
import OTPDisplayIsland from "../islands/OTPDisplayIsland.tsx";
import { WithSession } from "$fresh-session";
import { getOtpUris } from "../utils/otp.ts";
import { Handlers, PageProps } from "https://deno.land/x/fresh@1.3.1/server.ts";
import { useSignal } from "@preact/signals";

export type Data = { session: Record<string, string> };

export const handler: Handlers<
  Data,
  WithSession 
> = {
  async GET(_req, ctx) {
    const { session } = ctx.state;
    return ctx.render({
      session: session.data,
    });
  },
};

export default function Home({ data }: PageProps<Data>) {
  const loggedIn = useSignal(data.session.user !== undefined);
  return (
    <div>
      <div class="px-4 py-8 mx-auto bg-[#86efac] h-full">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <img
            class="my-6"
            src="/logo.png"
            width="128"
            height="128"
            alt="the RoeH logo a unique corporate identity mascot"
          />
          <h1 class="text-4xl font-bold">Roe's otp</h1>
          {!data.session.user ? (
            <WebauthnLoginRegisterIsland loggedIn={loggedIn} />
          ) : (
            <>
            <p class="my-4">
              Logged In as {data.session.user.username} <a href="/auth/logout">(logout)</a>
            </p>
            </>
          )}
        </div>
      </div>
      <OTPDisplayIsland loggedIn={loggedIn} />
    </div>
  );
}
