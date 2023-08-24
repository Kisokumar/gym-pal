import { Flex, Spinner, Text, useColorModeValue } from "@chakra-ui/react";
import {
  useProfileQuery,
  useServerConnectionQuery,
  useWorkoutSessionsQuery,
} from "@src/generated/graphql";

import CentrePageWrapper from "@src/components/Reusable/CentrePageWrapper";
import DeleteAccountButton from "@src/components/ProfileSettings/DeleteAccountButton";
import Head from "next/head";
import LoggedOutPage from "@src/components/StatePages/LoggedOutPage";
import NotConnected from "@src/components/StatePages/NotConnected";
import PrivateAccountSwitch from "@src/components/ProfileSettings/PrivateAccountSwitch";
import React from "react";
import Wrapper from "@src/components/Reusable/Wrapper";
import { createUrqlClient } from "@src/utils/createUrqlClient";
import unixToDate from "@src/utils/unixToDate";
import { withUrqlClient } from "next-urql";

function Settings() {
  const [{ data: userData, fetching }] = useProfileQuery();
  const [{ data: workoutSessionsData }] = useWorkoutSessionsQuery();
  const [{ error: serverError }] = useServerConnectionQuery();

  const sessions = workoutSessionsData?.WorkoutSessions;

  if (serverError) {
    return <NotConnected pageProps={undefined} />;
  }

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

  const UseColorModeValue = useColorModeValue;

  return (
    <>
      <Head>
        <title>Profile • Gympal</title>
        <meta
          content="GymPal - Your Ultimate Fitness Tracking Companion. Achieve your fitness goals with GymPal, the all-in-one platform to track and visualize your gym progress. Connect with friends, view their profiles, and compare workout statistics."
          name="description"
        />
      </Head>
      <Flex justify="center">
        <Wrapper variant="regular">
          <Flex direction="column" gap={2} p={4}>
            <Flex
              alignItems="center"
              border="solid"
              borderColor={UseColorModeValue("gray.500", "gray.500")}
              borderRadius={4}
              borderWidth={1}
              justifyContent="space-between"
              p={2}
            >
              <Text alignItems="center" display="flex" gap={2}>
                {username}
              </Text>
              <Flex justifyContent="center">
                <DeleteAccountButton pageProps={undefined} />
              </Flex>
            </Flex>
            <Flex
              border="solid"
              borderColor={UseColorModeValue("gray.500", "gray.500")}
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

export default withUrqlClient(createUrqlClient)(Settings);
