import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type {} from "styled-components/cssprop";
import { Analytics } from "@vercel/analytics/react";
import "@fontsource/oswald/variable.css";
import "@fontsource/inconsolata/variable.css";
import "@fontsource/nunito/variable.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
