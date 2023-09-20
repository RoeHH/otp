 import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { Signal } from "@preact/signals";
import * as OTPAuth from "https://deno.land/x/otpauth@v9.1.4/dist/otpauth.esm.js"
import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";

interface OTPCardProps {
  uri: string;
}

export default function OTPCardIsland(props: OTPCardProps) {

  const otpAuth: OTPAuth.HOTP | OTPAuth.TOTP = OTPAuth.URI.parse(props.uri)

  const token = useSignal("")

  useEffect(() => {
    setInterval(() => {
      token.value = otpAuth.generate();
    }, 1000);
  }, []);

  return (
    <div
      class="block w-64 rounded-lg bg-white p-6 dark:bg-neutral-700">
      <h5
        class="mb-2 text-center text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
        {otpAuth.issuer} {otpAuth.label}
      </h5>
      <p class="mb-4 text-center text-base text-neutral-600 dark:text-neutral-200">
        {token.value}
      </p>
    </div>
  );
}
