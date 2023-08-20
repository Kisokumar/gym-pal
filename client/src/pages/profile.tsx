import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { useProfileQuery, useWorkoutSessionsQuery } from "../generated/graphql";

import DeleteAccountButton from "../components/Account/DeleteAccountButton";
import Head from "next/head";
import LoggedOutPage from "../components/Reusable/LoggedOutPage";
import PrivateAccountSwitch from "../components/Account/PrivateAccountSwitch";
import React from "react";
import Wrapper from "../components/Reusable/Wrapper";
import { createUrqlClient } from "../utils/createUrqlClient";
import unixToDate from "../utils/unixToDate";
import { withUrqlClient } from "next-urql";

function Profile() {
  const [{ data: userData, fetching }] = useProfileQuery();
  const [{ data: workoutSessionsData }] = useWorkoutSessionsQuery();

  const sessions = workoutSessionsData?.WorkoutSessions;

  if (!userData?.me && !fetching) {
    return (
      <>
        <LoggedOutPage pageProps={undefined} />
      </>
    );
  } else if (fetching) {
    return (
      <Box mt="23vh" justifyContent="center" alignItems="center" display="flex">
        <Spinner size="xl" />
      </Box>
    );
  }

  const username = userData?.me?.username;
  const createdAt = userData?.me?.createdAt;

  return (
    <>
      <Head>
        <title>Profile • Gympal</title>
        <meta
          name="description"
          content="GymPal - Your Ultimate Fitness Tracking Companion. Achieve your fitness goals with GymPal, the all-in-one platform to track and visualize your gym progress. Connect with friends, view their profiles, and compare workout statistics."
        />
      </Head>
      <Flex justify="center">
        <Wrapper variant="regular">
          <Flex direction="column" gap={2} p={4}>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              border="solid"
              p={2}
              borderRadius={4}
              borderWidth={1}
            >
              <Text display="flex" alignItems="center" gap={2}>
                {username}
              </Text>
              <Flex justifyContent="center">
                <DeleteAccountButton pageProps={undefined} />
              </Flex>
            </Flex>
            <Flex
              justifyContent="space-between"
              border="solid"
              p={2}
              borderRadius={4}
              borderWidth={1}
            >
              <Text>Joined {unixToDate(Number(createdAt), "short")}</Text>
              <Text> {sessions?.length} sessions logged</Text>
              <Flex>
                <PrivateAccountSwitch pageProps={undefined} />
              </Flex>
            </Flex>
          </Flex>
        </Wrapper>
      </Flex>
    </>
  );
}

export default withUrqlClient(createUrqlClient)(Profile);
