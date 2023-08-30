import { Box, Button, Text, useColorMode } from "@chakra-ui/react";
import { useMeQuery } from "@src/generated/graphql";
import { createUrqlClient } from "@src/utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import NavUserSearch from "../Search/NavUserSearch";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { NavWelcomeMessage } from "./NavWelcomeMessage";
import ProfileModal from "./ProfileModal/ProfileModal";
import { NavIcon } from "./NavIcon";
import { SearchIcon } from "@chakra-ui/icons";

function NavBar() {
  const { colorMode } = useColorMode();
  const router = useRouter();
  const [{ data: meData, fetching }] = useMeQuery();

  const loginButton = (
    <Button
      flex={1}
      fontSize="sm"
      size="sm"
      type="submit"
      onClick={async () => {
        await router.push("/login");
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
      onClick={async () => {
        await router.push("/signup");
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
      color={colorMode === "light" ? "gray.700" : "gray.200"}
      // h={16}
      display="flex"
      justifyContent="space-between"
      p={2}
      pos="fixed"
      top="0"
      w="100%"
    >
      <Box alignItems="center" display="flex" gap={2} ml={4}>
        <Link href="/">
          <Text color="white" fontSize="xl">
            GymPal
          </Text>
        </Link>
        {router.pathname !== "/search" && !fetching && meData?.me && (
          <NavUserSearch pageProps={undefined} />
        )}
        {/* <NavBetaStatusPopover /> */}
      </Box>
      <Box alignItems="center" display="flex" gap={2} mr={4}>
        {!fetching && (
          <>
            {!meData?.me ? (
              <>{navButtons}</>
            ) : (
              <Box alignItems="center" display="flex" gap={2}>
                <NavWelcomeMessage iconSize={20} meData={meData} />
                <NavIcon
                  icon={<AiOutlineHome size={20} />}
                  label="Home"
                  tooltipLabel="Home"
                  onClickFn={async () => {
                    await router.push("/");
                  }}
                />
                <Box display={["flex", "none", "none"]}>
                  <NavIcon
                    icon={<SearchIcon />}
                    label="Searc"
                    tooltipLabel="Search"
                    onClickFn={async () => {
                      await router.push("/search");
                    }}
                  />
                </Box>
                {/* <NavIcon
                  icon={<BsPeople size={20} />}
                  label="Friends"
                  tooltipLabel="Friends"
                  onClickFn={async () => {
                    await router.push("/friends");
                  }}
                /> */}
                <ProfileModal />
              </Box>
            )}
          </>
        )}
        <DarkModeSwitch
          borderRadius={!fetching && meData?.me ? "full" : "lg"}
        />
      </Box>
    </Box>
  );
}

export default withUrqlClient(createUrqlClient)(NavBar);
