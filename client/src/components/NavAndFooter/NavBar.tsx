import {
  Box,
  Button,
  Flex,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { ImExit } from "react-icons/im";
import { BiUser } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import { useLogoutMutation, useMeQuery } from "@src/generated/graphql";

import { DarkModeSwitch } from "./DarkModeSwitch";
import Link from "next/link";
import { Text } from "@chakra-ui/react";
import { createUrqlClient } from "@src/utils/createUrqlClient";
import { CiSettings } from "react-icons/ci";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { ProfileModalButton } from "./ProfileModalButton";
import { useDisclosure } from "@chakra-ui/react";
import { CustomTooltip } from "./CustomTooltip";

function NavBar() {
  const { colorMode } = useColorMode();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data: meData, fetching }] = useMeQuery();

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
        {/* // Todo Nav usersearch */}
        {/* <NavUserSearch pageProps={undefined} placeholder="Search GymPal" /> */}
        {/* <NavBetaStatusPopover /> */}
      </Box>
      <Box alignItems="center" display="flex" gap={2} mr={4}>
        {!fetching && (
          <>
            {!meData?.me ? (
              <>{navButtons}</>
            ) : (
              <Box alignItems="center" display="flex" gap={2}>
                <CustomTooltip label="Home">
                  <IconButton
                    aria-label="Home"
                    icon={<AiOutlineHome size={18} />}
                    rounded="full"
                    size="sm"
                    onClick={() => {
                      router.push("/");
                    }}
                  />
                </CustomTooltip>
                <Popover
                  isOpen={isOpen}
                  trigger="click"
                  onClose={onClose}
                  onOpen={onOpen}
                >
                  <PopoverTrigger>
                    <Box>
                      <CustomTooltip label="Account">
                        <IconButton
                          aria-label="Profile"
                          icon={<BiUser size={18} />}
                          rounded="full"
                          size="sm"
                          onClick={onOpen}
                        />
                      </CustomTooltip>
                    </Box>
                  </PopoverTrigger>
                  <PopoverContent mr={4}>
                    <PopoverHeader>
                      <ProfileModalButton
                        ariaLabel="See Account"
                        label={
                          <Flex alignItems="center" gap={2}>
                            <BiUser size={18} />
                            {meData?.me?.username}{" "}
                          </Flex>
                        }
                        onClickFn={() => {
                          router.push(`/profile/${meData.me?.username}`);
                          onClose();
                        }}
                      />
                    </PopoverHeader>
                    <PopoverBody>
                      <ProfileModalButton
                        ariaLabel="Settings"
                        icon={<CiSettings size={18} />}
                        label="Settings"
                        onClickFn={() => {
                          router.push("/settings");
                          onClose();
                        }}
                      />
                      <ProfileModalButton
                        ariaLabel="Log Out"
                        icon={<ImExit size={18} />}
                        label="Log Out"
                        loading={logoutFetching}
                        onClickFn={() => {
                          logout({});
                          router.push("/login");
                          onClose();
                        }}
                      />
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
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
