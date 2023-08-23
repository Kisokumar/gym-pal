import {
  Box,
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useColorMode,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import {
  useLogoutMutation,
  useMeQuery,
  useServerConnectionQuery,
} from "../../generated/graphql";

import { BsGlobeAmericas } from "react-icons/bs";
import { CiLock } from "react-icons/ci";
import { DarkModeSwitch } from "./DarkModeSwitch";
import Link from "next/link";
import { MdConstruction } from "react-icons/md";
import StatusIcon from "./StatusIcon";
import { Text } from "@chakra-ui/react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";

function NavBar() {
  const { colorMode } = useColorMode();
  const router = useRouter();

  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();

  const [
    {
      data: serverConnection,
      fetching: fetchingServerConnection,
      stale: staleStatus,
    },
    getConnection,
  ] = useServerConnectionQuery({ requestPolicy: "cache-and-network" });

  useEffect(() => {
    if (staleStatus) {
      getConnection();
    }
  }, [getConnection, staleStatus]);

  const loginButton = (
    <Button
      flex={1}
      fontSize="sm"
      size="sm"
      type="submit"
      onClick={() => {
        router.push("/login");
      }}
    >
      Log In
    </Button>
  );

  const signUpButton = (
    <Button
      flex={1}
      fontSize="sm"
      size="sm"
      onClick={() => {
        router.push("/signup");
      }}
    >
      Sign Up
    </Button>
  );

  const navButtons = (() => {
    switch (router.pathname) {
      case "/signup":
        return loginButton;
      case "/login":
        return signUpButton;
      case "/":
        return null;
      default:
        return (
          <>
            {signUpButton}
            {loginButton}
          </>
        );
    }
  })();

  return (
    <Box
      alignItems="center"
      bg={colorMode === "light" ? "gray.600" : "gray.900"}
      display="flex"
      h={14}
      justifyContent="space-between"
    >
      <Box alignItems="center" display="flex" gap={2} ml={4}>
        <Link href="/">
          <Text color="white" fontSize="xl">
            GymPal
          </Text>
        </Link>
        <Box alignItems="center" display={["none", "none", "flex"]} gap={2}>
          <Popover trigger="hover">
            <PopoverTrigger>
              <Flex alignItems="center" gap={2}>
                <Text
                  alignItems="center"
                  color="white"
                  display="flex"
                  fontSize="xl"
                  gap={2}
                >
                  <MdConstruction />
                  beta
                </Text>
              </Flex>
            </PopoverTrigger>
            <PopoverContent ml={4}>
              <PopoverArrow />
              <PopoverHeader>We are currently in development,</PopoverHeader>
              <PopoverBody>
                Please report any bugs or request features{" "}
                <Link
                  color={colorMode === "light" ? "blue.300" : "blue.700"}
                  href="https://github.com/kisokumar/gym-pal/issues"
                  target="_blank"
                >
                  here.
                </Link>
              </PopoverBody>
            </PopoverContent>
            {!fetchingServerConnection && (
              <StatusIcon
                pageProps={undefined}
                status={serverConnection?.serverConnection}
              />
            )}
          </Popover>
        </Box>
      </Box>
      <Box alignItems="center" display="flex" gap={2} mr={4}>
        {!fetching && (
          <>
            {!data?.me ? (
              <>{navButtons}</>
            ) : (
              <Box alignItems="center" display="flex" gap={2}>
                <Box alignItems="center" display={["none", "none", "flex"]}>
                  <Popover trigger="hover">
                    <PopoverTrigger>
                      <Box mx={2}>
                        {data?.me?.privateAccount ? (
                          <CiLock color="white" />
                        ) : (
                          <BsGlobeAmericas color="white" />
                        )}
                      </Box>
                    </PopoverTrigger>
                    <PopoverContent ml={4}>
                      <PopoverArrow />
                      <PopoverHeader>
                        Profile privacy is set to{" "}
                        {data?.me?.privateAccount ? "private." : "public."}
                      </PopoverHeader>
                      <PopoverBody>
                        <Flex gap={1}>
                          <Text>Update it </Text>
                          <Link href="/profile">
                            <Text
                              color={
                                colorMode === "light" ? "blue.600" : "blue.200"
                              }
                            >
                              here.
                            </Text>
                          </Link>
                        </Flex>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                  <Link href="profile">
                    <Text color="white" fontSize="xl" noOfLines={1}>
                      Hey {data?.me?.username}!
                    </Text>
                  </Link>{" "}
                </Box>

                {router.pathname !== "/profile" && (
                  <Button
                    fontSize="sm"
                    fontWeight="medium"
                    isLoading={logoutFetching}
                    size="sm"
                    onClick={() => {
                      router.push("/profile");
                    }}
                  >
                    Profile
                  </Button>
                )}
                <Button
                  fontSize="sm"
                  fontWeight="medium"
                  isLoading={logoutFetching}
                  size="sm"
                  onClick={() => {
                    logout({});
                    router.push("/login");
                  }}
                >
                  Log Out
                </Button>
              </Box>
            )}
          </>
        )}
        <DarkModeSwitch />
      </Box>
    </Box>
  );
}

export default withUrqlClient(createUrqlClient)(NavBar);
