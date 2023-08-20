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
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";

import { BsGlobeAmericas } from "react-icons/bs";
import { CiLock } from "react-icons/ci";
import { DarkModeSwitch } from "./DarkModeSwitch";
import Link from "next/link";
import { MdConstruction } from "react-icons/md";
import React from "react";
import { Text } from "@chakra-ui/react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";

function NavBar() {
  const { colorMode } = useColorMode();
  const router = useRouter();

  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();

  const loginButton = (
    <Button
      type="submit"
      fontSize="sm"
      size="sm"
      flex={1}
      onClick={() => {
        router.push("/login");
      }}
    >
      Log In
    </Button>
  );

  const signUpButton = (
    <Button
      fontSize="sm"
      size="sm"
      flex={1}
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
      bg={colorMode === "light" ? "gray.600" : "gray.900"}
      h={14}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box ml={4} gap={2} display="flex" alignItems="center">
        <Link href="/">
          <Text fontSize="xl" color="white">
            GymPal
          </Text>
        </Link>
        <Box display={["none", "none", "flex"]}>
          <Popover trigger="hover">
            <PopoverTrigger>
              <Text
                fontSize="xl"
                color="white"
                display="flex"
                alignItems="center"
                gap={2}
              >
                <MdConstruction />
                beta
              </Text>
            </PopoverTrigger>
            <PopoverContent ml={4}>
              <PopoverArrow />
              <PopoverHeader>We are currently in development,</PopoverHeader>
              <PopoverBody>
                Please report any bugs or request features{" "}
                <Link
                  target="_blank"
                  color={colorMode === "light" ? "blue.600" : "blue.200"}
                  href="https://github.com/kisokumar/gym-pal/issues"
                >
                  here.
                </Link>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
      </Box>
      <Box mr={4} gap={2} display="flex" alignItems="center">
        {!fetching && (
          <>
            {!data?.me ? (
              <>{navButtons}</>
            ) : (
              <Box gap={2} display="flex" alignItems="center">
                <Box display={["none", "none", "flex"]} alignItems="center">
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
                    <Text fontSize="xl" color="white" noOfLines={1}>
                      Hey {data?.me?.username}!
                    </Text>
                  </Link>{" "}
                </Box>

                {router.pathname !== "/profile" && (
                  <Button
                    fontSize="sm"
                    fontWeight="medium"
                    size="sm"
                    isLoading={logoutFetching}
                    onClick={() => {
                      router.push("/profile");
                    }}
                  >
                    Profile
                  </Button>
                )}
                <Button
                  fontSize="sm"
                  size="sm"
                  fontWeight="medium"
                  isLoading={logoutFetching}
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
