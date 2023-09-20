import { Signal, useSignal } from "@preact/signals";
import OTPCardIsland from "./OTPCardIsland.tsx";
import { useEffect } from "preact/hooks";

interface OTPDisplayProps {
  loggedIn: Signal<boolean>
}


export default async function OTPDisplayIsland({loggedIn}: OTPDisplayProps) {
  if(!loggedIn.value) {
    return  null;
  }

  console.log("loading otp display island");
  
  const otpUris: Signal<string[]> = useSignal([]);

  const loadOtpUris = async () => {
    console.log("loading otp uris");
    
    otpUris.value = await fetch('/api/otp').then((result) => result.json()).then((result) => result.uris);
  }

  useEffect(() => {
    loadOtpUris();
  }, []);

  return (
    <div class="p-12 flex gap-4 flex-auto flex-row flex-wrap justify-center w-screen">
        {otpUris.value.map((otp: string) => (
          <OTPCardIsland uri={otp} />
        ))}
    </div>
  );
}
