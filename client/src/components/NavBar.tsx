import {
  Box,
  Button,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useColorMode,
} from "@chakra-ui/react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

import { BsGlobeAmericas } from "react-icons/bs";
import { CiLock } from "react-icons/ci";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { MdConstruction } from "react-icons/md";
import React from "react";
import { Text } from "@chakra-ui/react";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";

function NavBar() {
  const { colorMode } = useColorMode();
  const router = useRouter();

  const isRegisterPage = router.pathname === "/signup";
  const isLoginPage = router.pathname === "/login";

  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();

  return (
    <Box
      bg={colorMode === "light" ? "gray.600" : "gray.900"}
      h={14}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box ml={4} gap={2} display="flex" alignItems="center">
        <Link href="/" style={{ textDecoration: "none" }}>
          <Text fontSize="xl" color="white">
            GymPal
          </Text>
        </Link>
        <Box display={["none", "none", "block"]}>
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
        {fetching || !data?.me ? (
          <>
            {!isRegisterPage && (
              <Link href="/signup">
                <Button fontSize="sm" size="sm">
                  Sign Up
                </Button>
              </Link>
            )}
            {!isLoginPage && (
              <Link href="/login">
                <Button fontSize="sm" size="sm">
                  Log In
                </Button>
              </Link>
            )}
          </>
        ) : (
          <Box gap={2} display="flex" alignItems="center">
            <Box display={["none", "none", "block"]}>
              <Popover trigger="hover">
                <PopoverTrigger>
                  <Box>
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
                  {/* <PopoverBody>
                    <Link
                      color={colorMode === "light" ? "blue.600" : "blue.200"}
                      href="/account"
                    >
                      Update it here.
                    </Link>
                  </PopoverBody> */}
                </PopoverContent>
              </Popover>
            </Box>

            <Text fontSize="xl" color="white" noOfLines={1}>
              Hey {data?.me?.username}!
            </Text>
            <Button
              fontSize="sm"
              size="sm"
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

export default withUrqlClient(createUrqlClient, { ssr: true })(NavBar);
