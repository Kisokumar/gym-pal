import { Box, Button, Card, Heading } from "@chakra-ui/react";

import { BiError } from "react-icons/bi";
import CentrePageWrapper from "@src/components/Reusable/CentrePageWrapper";
import Head from "next/head";
import { Text } from "@chakra-ui/react";
import Wrapper from "@src/components/Reusable/Wrapper";
import { createUrqlClient } from "@src/utils/createUrqlClient";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";

const Custom500Page = () => {
  const router = useRouter();

  return (
    <CentrePageWrapper>
      <>
        <Head>
          <title>Error • GymPal</title>
          <meta
            content="GymPal - Your Ultimate Fitness Tracking Companion. Achieve your fitness goals with GymPal, the all-in-one platform to track and visualize your gym progress. Connect with friends, view their profiles, and compare workout statistics."
            name="description"
          />
        </Head>
        <Wrapper variant="small">
          <>
            <Card overflow="hidden" variant="outline">
              <Box display="flex" flexDirection="column" m={4}>
                <Heading alignItems="center" display="flex" gap={2} size="md">
                  <BiError />
                  Error 500
                </Heading>
                <Text mt={4}>Oops! There was an internal server error. 😔</Text>
                <Box display="flex" mt={2}>
                  <Button
                    flex={1}
                    type="submit"
                    onClick={async () => {
                      await router.push("/");
                    }}
                  >
                    Go to home page
                  </Button>
                </Box>
              </Box>
            </Card>
          </>
        </Wrapper>
      </>
    </CentrePageWrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Custom500Page);
