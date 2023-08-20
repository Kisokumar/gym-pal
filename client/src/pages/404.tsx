import { Box, Button, Card, Heading } from "@chakra-ui/react";

import { BiError } from "react-icons/bi";
import CentrePageWrapper from "../components/Reusable/CentrePageWrapper";
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
          content="GymPal - Your Ultimate Fitness Tracking Companion. Achieve your fitness goals with GymPal, the all-in-one platform to track and visualize your gym progress. Connect with friends, view their profiles, and compare workout statistics."
          name="description"
        />
      </Head>
      <CentrePageWrapper>
        <Wrapper variant="small">
          <Card overflow="hidden" variant="outline">
            <Box display="flex" flexDirection="column" m={4}>
              <Heading alignItems="center" display="flex" gap={2} size="md">
                <BiError />
                Error 404
              </Heading>
              <Text mt={4}>Oops! This page doesn't exist 😔</Text>
              <Box display="flex" mt={2}>
                <Button
                  flex={1}
                  type="submit"
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  Go to home page
                </Button>
              </Box>
            </Box>
          </Card>
        </Wrapper>
      </CentrePageWrapper>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Custom404Page);
