import { Box, Button, Link, useColorMode } from "@chakra-ui/react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

import { DarkModeSwitch } from "./DarkModeSwitch";
import React from "react";
import { Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface NavBarProps {}

export default function NavBar(props: NavBarProps) {
  const { colorMode } = useColorMode();
  const router = useRouter();

  const isRegisterPage = router.pathname === "/register";
  const isLoginPage = router.pathname === "/login";

  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();

  return (
    <Box
      bg={colorMode === "light" ? "gray.200" : "gray.900"}
      h={14}
      display="flex"
      alignItems="center"
      justifyContent={"space-between"}
    >
      <Box ml={4} gap={2} display={"flex"}>
        <Text fontSize="xl">Gym Pal</Text>
      </Box>
      <Box mr={4} gap={2} display={"flex"}>
        {fetching || !data?.me ? (
          <>
            {!isRegisterPage && (
              <Link href="/register">
                <Button fontSize={"sm"} size={"sm"}>
                  Register
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
          <Box gap={2} display={"flex"}>
            <Text fontSize="xl">Hey {data?.me?.username}!</Text>
            <Button
              fontSize={"sm"}
              size={"sm"}
              isLoading={logoutFetching}
              onClick={() => {
                logout({});
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
