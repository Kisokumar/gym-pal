import {
  Flex,
  useColorModeValue,
  Text,
  Spinner,
  Box,
  Card,
  Heading,
  Button,
} from "@chakra-ui/react";
import { renderPrivateIcon } from "@src/components/ProfileSettings/PrivateAccountSwitch";
import CentrePageWrapper from "@src/components/Reusable/CentrePageWrapper";
import Wrapper from "@src/components/Reusable/Wrapper";
import LoggedOutPage from "@src/components/StatePages/LoggedOutPage";
import { useProfileQuery } from "@src/generated/graphql";
import { createUrqlClient } from "@src/utils/createUrqlClient";
import unixToDate from "@src/utils/unixToDate";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useRouter } from "next/router";
import { BiError } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";

const ProfilePage = () => {
  // Todo cleanup this page
  const router = useRouter();
  const { user: routeUser } = router.query;

  const borderColor = useColorModeValue("gray.500", "gray.500");

  const [{ data: profileData, fetching: profileFetching }] = useProfileQuery({
    requestPolicy: "network-only",
    variables: { username: routeUser as string },
  });

  if (profileFetching) {
    return (
      <CentrePageWrapper>
        <Spinner size="xl" />
      </CentrePageWrapper>
    );
  }

  if (!profileData?.profile || !profileData) {
    return (
      <CentrePageWrapper>
        <>
          <Head>
            <title>User not found • GymPal</title>
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
                    User not found
                  </Heading>
                </Box>
              </Card>
            </>
          </Wrapper>
        </>
      </CentrePageWrapper>
    );
  }

  if (
    profileData?.profile.errors &&
    profileData.profile.errors.filter((t) => t.field === "auth").length > 0
  ) {
    return <LoggedOutPage pageProps={undefined} />;
  }

  if (
    profileData?.profile.errors &&
    profileData.profile.errors.filter((t) => t.field === "user").length > 0
  ) {
    return (
      <CentrePageWrapper>
        <>
          <Head>
            <title>User not found • GymPal</title>
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
                    User not found
                  </Heading>
                </Box>
              </Card>
            </>
          </Wrapper>
        </>
      </CentrePageWrapper>
    );
  }

  const privateAccount = profileData?.profile?.user?.privateAccount;

  return (
    <>
      <Head>
        <title>{routeUser} • GymPal</title>
        <meta
          content="gympal - your ultimate fitness tracking companion. achieve your fitness goals with gympal, the all-in-one platform to track and visualize your gym progress. connect with friends, view their profiles, and compare workout statistics."
          name="description"
        />
      </Head>
      <Flex justify="center" zIndex={1}>
        <Wrapper variant="regular">
          <Flex direction="column" gap={2} p={4}>
            <Flex
              alignItems="center"
              border="solid"
              borderColor={borderColor}
              borderRadius={4}
              borderWidth={1}
              justifyContent="space-between"
              p={2}
            >
              <Text alignItems="center" display="flex" gap={2}>
                {profileData?.profile.user?.username}
              </Text>
              {profileData?.profile.owner && (
                <Flex justifyContent="center">
                  <Button
                    aria-label="Settings"
                    fontSize="sm"
                    fontWeight="medium"
                    justifyContent="start"
                    size="sm"
                    w="full"
                    onClick={() => {
                      router.push("/settings");
                    }}
                  >
                    <Flex gap={2} my={2}>
                      <CiSettings size={18} />
                      Settings
                    </Flex>
                  </Button>
                </Flex>
              )}
            </Flex>
            <Flex
              border="solid"
              borderColor={borderColor}
              borderRadius={4}
              borderWidth={1}
              direction={["column", "column", "row"]}
              gap={["2", "2", "none"]}
              justifyContent="space-between"
              p={2}
            >
              <Flex
                gap={1}
                justifyContent={["space-between", "space-between", "none"]}
              >
                <Text>Joined </Text>
                <Text>
                  {unixToDate(
                    Number(profileData?.profile.user?.createdAt),
                    "short"
                  )}
                </Text>
              </Flex>
              {/* //Todo: Sessions */}
              {/* <Flex gap={1} justifyContent={["space-between", "none", "none"]}>
                <Text>Sessions Logged </Text>
                <Text> {sessions?.length} </Text>
              </Flex> */}
              <Flex justifyContent="center">
                <Flex
                  alignItems="center"
                  gap={2}
                  justifyContent={["space-between", "space-between", "none"]}
                  w="100%"
                >
                  <Flex>
                    {privateAccount ? (
                      <Text alignItems="center" display="flex">
                        Private Account
                      </Text>
                    ) : (
                      <Text alignItems="center" display="flex">
                        Public Account
                      </Text>
                    )}
                  </Flex>
                  <Flex gap={2}>
                    {privateAccount != null &&
                      renderPrivateIcon(privateAccount)}
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Wrapper>
      </Flex>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(ProfilePage);
