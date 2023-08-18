import "@fontsource/raleway/400.css";
import "@fontsource/open-sans/700.css";

import { extendTheme } from "@chakra-ui/react";

const fonts = {
  mono: `'Menlo', monospace`,
  heading: `'Open Sans', sans-serif`,
  body: `'Raleway', sans-serif`,
};

const breakpoints = {
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
};

const theme = extendTheme({
  colors: {
    brand: {
      text: {
        default: "#16161D",
        _dark: "#ade3b8",
      },
    },
    black: "#16161D",
  },
  radii: {
    button: "12px",
  },
  fonts,
  breakpoints,
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
  // todo: fix styling, disabling light mode for now
  styles: {
    global: ({ colorMode }: { colorMode: "light" | "dark" }) => ({
      body: {
        bg: colorMode === "light" ? "gray.300" : "#1a202c",
      },
    }),
  },
});

export default theme;
