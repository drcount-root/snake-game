import { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Head from "next/head";
import GlobalMeta from "@/components/GlobalMeta";
import GoogleTag from "@/components/GoogleTag/GoogleTag";
import { themeDark, themeLight } from "@/theme";
import GradientBackground from "@/components/GradientBackground";
import NavBar, { navBarHeight } from "@/components//NavBar";
import Game from "@/components/Game";

export default function Home() {
  const [theme, setTheme] = useState(themeLight);
  const [themeSwitch, setThemeSwitch] = useState<"auto" | "light" | "dark">(
    "auto"
  );

  useEffect(() => {
    const themeMap = {
      auto: window.matchMedia("(prefers-color-scheme: dark)").matches
        ? themeDark
        : themeLight,
      light: themeLight,
      dark: themeDark,
    };
    setTheme(themeMap[themeSwitch]);
  }, [themeSwitch]);

  return (
    <>
      <Head>
        <title>Snake JS - Richh</title>
        <meta name="description" content="Richh NextJS Starter" />
        <GlobalMeta />
      </Head>

      <GoogleTag />

      <ThemeProvider theme={theme}>
        <Outer>
          <NavBar setThemeSwitch={setThemeSwitch} />
          <Main>
            <Game />
          </Main>
        </Outer>
        <GradientBackground />
      </ThemeProvider>
    </>
  );
}

const Outer = styled.div`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Main = styled.main`
  padding-top: ${navBarHeight};
  height: 100vh;
`;
