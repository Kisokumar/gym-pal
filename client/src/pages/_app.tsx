import { ChakraProvider, Flex } from "@chakra-ui/react";

import { AppProps } from "next/app";
import Footer from "../components/Footer";
import Head from "next/head";
import NavBar from "../components/NavBar";
import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>GymPal</title>
        <meta
          name="description"
          content="GymPal - Your Ultimate Fitness Tracking Companion. Achieve your fitness goals with GymPal, the all-in-one platform to track and visualize your gym progress. Connect with friends, view their profiles, and compare workout statistics."
        />
      </Head>
      <Flex h="100vh" direction="column">
        <NavBar {...pageProps} />
        <Component {...pageProps} />
        <Footer />
      </Flex>
    </ChakraProvider>
  );
}

export default MyApp;
