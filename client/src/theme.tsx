import "@fontsource/raleway/400.css";
import "@fontsource/open-sans/700.css";

import { extendTheme } from "@chakra-ui/react";

const fonts = {
  body: `'Raleway', sans-serif`,
  heading: `'Open Sans', sans-serif`,
  mono: `'Menlo', monospace`,
};

const breakpoints = {
  lg: "64em",
  md: "52em",
  sm: "40em",
  xl: "80em",
};

const theme = extendTheme({
  breakpoints,
  colors: {
    black: "#16161D",
    brand: {
      text: {
        _dark: "#ade3b8",
        default: "#16161D",
      },
    },
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
  fonts,
  radii: {
    button: "12px",
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
