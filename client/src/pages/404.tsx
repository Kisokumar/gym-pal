import { Box, Button, Card, Heading } from "@chakra-ui/react";

import { BiError } from "react-icons/bi";
import Head from "next/head";
import { Text } from "@chakra-ui/react";
import Wrapper from "../components/Reusable/Wrapper";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";

const Custom404Page = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Page not found • GymPal</title>
        <meta
          name="description"
          content="GymPal - Your Ultimate Fitness Tracking Companion. Achieve your fitness goals with GymPal, the all-in-one platform to track and visualize your gym progress. Connect with friends, view their profiles, and compare workout statistics."
        />
      </Head>
      <Box mt="23vh" justifyContent="center" alignItems="center">
        <Wrapper variant="small">
          <>
            <Card overflow="hidden" variant="outline">
              <Box display="flex" flexDirection="column" m={4}>
                <Heading size="md" display="flex" gap={2} alignItems="center">
                  <BiError />
                  Error 404
                </Heading>
                <Text mt={4}>Oops! This page doesn't exist 😔</Text>
                <Box mt={2} display="flex">
                  <Button
                    type="submit"
                    flex={1}
                    onClick={() => {
                      router.push("/");
                    }}
                  >
                    Go to home page
                  </Button>
                </Box>
              </Box>
            </Card>
          </>
        </Wrapper>
      </Box>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Custom404Page);
