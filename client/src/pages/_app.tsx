import { ChakraProvider, Flex } from "@chakra-ui/react";

import { AppProps } from "next/app";
import NavBar from "../components/NavBar";
import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Flex h="100vh" direction="column">
        <NavBar {...pageProps} />
        <Component {...pageProps} />
      </Flex>
    </ChakraProvider>
  );
}

export default MyApp;
