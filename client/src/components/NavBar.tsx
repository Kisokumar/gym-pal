import { Box, Button, Link, useColorMode } from "@chakra-ui/react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

import { BsGlobeAmericas } from "react-icons/bs";
import { CiLock } from "react-icons/ci";
import { DarkModeSwitch } from "./DarkModeSwitch";
import React from "react";
import { Text } from "@chakra-ui/react";
import { createUrqlClient } from "../utils/createUrqlClient";
import { isServer } from "../utils/isServer";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";

function NavBar() {
  const { colorMode } = useColorMode();
  const router = useRouter();

  const isRegisterPage = router.pathname === "/signup";
  const isLoginPage = router.pathname === "/login";

  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({ pause: isServer() });

  return (
    <Box
      bg={colorMode === "light" ? "gray.600" : "gray.900"}
      h={14}
      display="flex"
      alignItems="center"
      justifyContent={"space-between"}
    >
      <Box ml={4} gap={2} display={"flex"}>
        <Text fontSize="xl" color="white">
          GymPal
        </Text>
      </Box>
      <Box mr={4} gap={2} display={"flex"}>
        {fetching || !data?.me ? (
          <>
            {!isRegisterPage && (
              <Link href="/signup">
                <Button fontSize={"sm"} size={"sm"}>
                  Sign Up
                </Button>
              </Link>
            )}
            {!isLoginPage && (
              <Link href="/login">
                <Button fontSize={"sm"} size={"sm"}>
                  Log In
                </Button>
              </Link>
            )}
          </>
        ) : (
          <Box gap={2} display={"flex"} alignItems="center">
            {data?.me?.privateAccount ? (
              <CiLock color="white" />
            ) : (
              <BsGlobeAmericas color="white" />
            )}
            <Text fontSize="xl" color="white">
              Hey {data?.me?.username}!
            </Text>
            <Button
              fontSize={"sm"}
              size={"sm"}
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
        <DarkModeSwitch />
      </Box>
    </Box>
  );
}

export default withUrqlClient(createUrqlClient)(NavBar);
