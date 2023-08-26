import {
  Popover,
  PopoverTrigger,
  IconButton,
  PopoverContent,
  Flex,
  PopoverBody,
  useDisclosure,
  useColorModeValue,
  Box,
  Divider,
} from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import { BiUser } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { ImExit } from "react-icons/im";
import { CustomTooltip } from "../CustomTooltip";
import { ProfileModalButton } from "./ProfileModalButton";
import { useLogoutMutation, useMeQuery } from "@src/generated/graphql";

export default function ProfileModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data: meData }] = useMeQuery();

  const popoverBg = useColorModeValue("gray.600", "gray.900");

  return (
    <Popover isOpen={isOpen} trigger="click" onClose={onClose} onOpen={onOpen}>
      <PopoverTrigger>
        <Box rounded="full">
          <CustomTooltip label="Account">
            <IconButton
              aria-label="Profile"
              icon={<BiUser size={20} />}
              rounded="full"
              size="md"
              onClick={onOpen}
            />
          </CustomTooltip>
        </Box>
      </PopoverTrigger>
      <PopoverContent
        bg={popoverBg}
        border="0px"
        borderRadius="0 0 10px 10px"
        mr={4}
      >
        {/* <PopoverHeader></PopoverHeader> */}
        <PopoverBody>
          <ProfileModalButton
            ariaLabel="See Account"
            label={
              <Flex alignItems="center" gap={2}>
                <BiUser size={22} />
                {meData?.me?.username}
              </Flex>
            }
            onClickFn={() => {
              router.push(`/profile/${meData?.me?.username}`);
              onClose();
            }}
          />
          <Divider my={1} />
          <ProfileModalButton
            ariaLabel="Settings"
            icon={<CiSettings size={22} />}
            label="Settings"
            onClickFn={() => {
              router.push("/settings");
              onClose();
            }}
          />
          {/* <Divider my={1} /> */}
          <ProfileModalButton
            ariaLabel="Log Out"
            icon={<ImExit size={18} />}
            label="Log Out"
            loading={logoutFetching}
            onClickFn={async () => {
              onClose();
              await router.push("/login");
              logout({});
            }}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
