import {
  Box,
  Button,
  Card,
  Heading,
  Link,
  useColorMode,
} from "@chakra-ui/react";

import { BiError } from "react-icons/bi";
import CentrePageWrapper from "../Reusable/CentrePageWrapper";
import React from "react";
import { Text } from "@chakra-ui/react";
import Wrapper from "../Reusable/Wrapper";
import { createUrqlClient } from "@src/utils/createUrqlClient";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import Head from "next/head";

function LoggedOutPage() {
  const router = useRouter();
  const { colorMode } = useColorMode();

  return (
    <CentrePageWrapper>
      <>
        <Head>
          <title>Not Logged In • GymPal</title>
          <meta
            content="gympal - your ultimate fitness tracking companion. achieve your fitness goals with gympal, the all-in-one platform to track and visualize your gym progress. connect with friends, view their profiles, and compare workout statistics."
            name="description"
          />
        </Head>
        <Wrapper variant="small">
          <>
            <Card overflow="hidden" variant="outline">
              <Box display="flex" flexDirection="column" m={4}>
                <Heading alignItems="center" display="flex" gap={2} size="md">
                  <BiError />
                  Not Logged In
                </Heading>
                <Text mt={4}>Please log in to continue.</Text>
                <Box display="flex" my={2}>
                  <Button
                    flex={1}
                    type="submit"
                    onClick={() => {
                      router.push("/login");
                    }}
                  >
                    Log In
                  </Button>
                </Box>
                <Box display="flex">
                  <Text>
                    Don't have an account?{" "}
                    <Link
                      color={colorMode === "dark" ? "blue.400" : "blue.600"}
                      href="/signup"
                    >
                      Sign up
                    </Link>
                  </Text>
                </Box>
              </Box>
            </Card>
          </>
        </Wrapper>
      </>
    </CentrePageWrapper>
  );
}
export default withUrqlClient(createUrqlClient, { ssr: true })(LoggedOutPage);
