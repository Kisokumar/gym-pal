import { ChakraProvider, Flex } from "@chakra-ui/react";

import { AppProps } from "next/app";
import Footer from "@src/components/NavAndFooter/Footer";
import Head from "next/head";
import NavBar from "@src/components/NavAndFooter/NavBar";
import { createUrqlClient } from "@src/utils/createUrqlClient";
import theme from "@src/theme";
import { withUrqlClient } from "next-urql";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>GymPal</title>
        <meta
          content="GymPal - Your Ultimate Fitness Tracking Companion. Achieve your fitness goals with GymPal, the all-in-one platform to track and visualize your gym progress. Connect with friends, view their profiles, and compare workout statistics."
          name="description"
        />
      </Head>
      <Flex direction="column" h="100vh">
        <NavBar {...pageProps} />
        <Component {...pageProps} />
        <Footer />
      </Flex>
    </ChakraProvider>
  );
}

// export default MyApp;

export default withUrqlClient(createUrqlClient)(MyApp);
