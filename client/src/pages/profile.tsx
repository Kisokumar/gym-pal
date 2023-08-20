import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useProfileQuery, useWorkoutSessionsQuery } from "../generated/graphql";

import CentrePageWrapper from "../components/Reusable/CentrePageWrapper";
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
      <CentrePageWrapper>
        <Spinner size="xl" />
      </CentrePageWrapper>
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
              border="solid"
              alignItems="center"
              borderRadius={4}
              borderWidth={1}
              justifyContent="space-between"
              p={2}
            >
              <Text display="flex" alignItems="center" gap={2}>
                {username}
              </Text>
              <Flex justifyContent="center">
                <DeleteAccountButton pageProps={undefined} />
              </Flex>
            </Flex>
            <Flex
              border="solid"
              borderRadius={4}
              borderWidth={1}
              direction={["column", "row", "row"]}
              gap={["2", "none", "none"]}
              justifyContent={"space-between"}
              p={2}
            >
              <Flex gap={1} justifyContent={["space-between", "none", "none"]}>
                <Text>Joined </Text>
                <Text>{unixToDate(Number(createdAt), "short")}</Text>
              </Flex>
              <Flex gap={1} justifyContent={["space-between", "none", "none"]}>
                <Text>Sessions Logged </Text>
                <Text> {sessions?.length} </Text>
              </Flex>
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
