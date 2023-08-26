"use client";

import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverBody,
  PopoverContent,
  Box,
  PopoverTrigger,
  useColorModeValue,
  useDisclosure,
  IconButton,
  InputRightElement,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import React, { useRef } from "react";
import Link from "next/link";

import { useUserSearchQuery } from "@src/generated/graphql";
import { createUrqlClient } from "@src/utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { useState } from "react";
import { BsGlobeAmericas } from "react-icons/bs";
import ErrorCard from "../Reusable/ErrorCard";
import ShowConditionally from "../Reusable/ShowConditionally";
import { CiLock } from "react-icons/ci";

type Props = {
  height: string;
};

function NavUserSearch({ height = "40px" }: Props): JSX.Element {
  // Todo create nav search with popover
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchFocus, setSearchFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useState<string>("");

  const [{ data: usersData, fetching: usersFetching }, reFetchUsers] =
    useUserSearchQuery({
      requestPolicy: "network-only",
      variables: { search: query },
    });

  const handleSearch = (e: string) => {
    setQuery(e);
    reFetchUsers({
      variables: { search: e },
    });
  };

  const users = usersData?.searchUsers.users;

  const hoverColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const boxBgColor = useColorModeValue("gray.100", "whiteAlpha.100");
  const popoverBg = useColorModeValue("gray.600", "gray.900");
  const bgColor = useColorModeValue("gray.300", "#1a202c");

  return (
    <>
      <Flex
        alignItems="center"
        direction="column"
        display={["none", "flex", "flex"]}
        justifyContent="center"
        maxW="lg"
        mx={2}
        w="full"
      >
        <Popover
          closeOnBlur={true}
          initialFocusRef={inputRef}
          isOpen={isOpen}
          returnFocusOnClose={false}
          onClose={() => {
            if (searchFocus) {
              onClose();
            }
          }}
          onOpen={() => {
            setSearchFocus(true);
            onOpen();
          }}
        >
          <PopoverTrigger>
            <Flex>
              <InputGroup maxW={56}>
                <InputLeftElement h={height} pointerEvents="none">
                  <SearchIcon color="gray.700" />
                </InputLeftElement>
                <Input
                  _hover={{ borderColor: "transparent" }}
                  bg={bgColor}
                  borderColor="transparent"
                  focusBorderColor="transparent"
                  h={height}
                  pl={8}
                  placeholder="Search"
                  ref={inputRef}
                  rounded="full"
                  value={query}
                  onBlur={() => {
                    onClose();
                  }}
                  onChange={(e) => {
                    handleSearch(e.currentTarget.value);
                  }}
                  onFocus={() => {
                    onOpen();
                  }}
                />
                {query !== "" && (
                  <InputRightElement h={height}>
                    <IconButton
                      _hover={{ color: "#ebedf0" }}
                      aria-label="Clear Search"
                      bg="transparent"
                      icon={<CloseIcon />}
                      rounded="full"
                      size="xs"
                      onClick={(e) => {
                        e.preventDefault();
                        setQuery("");
                        inputRef?.current?.focus();
                      }}
                    />
                  </InputRightElement>
                )}
              </InputGroup>
            </Flex>
          </PopoverTrigger>
          <PopoverContent
            bg={popoverBg}
            border="0px"
            borderRadius="0 0 10px 10px"
            display={query !== "" ? "block" : "none"}
            w="250px"
            zIndex={10}
            // maxW="md"
            // ml={[8, 16, 16]}
          >
            <PopoverBody pt={0} zIndex={10}>
              <Flex flexDirection="column" gap={2} pb={2} pt={0} px={1}>
                {users && users?.length > 0 ? (
                  users.map((user) => (
                    <Link
                      href={`/profile/${user.username}`}
                      key={user.username}
                    >
                      <Box
                        _hover={{ hoverColor }}
                        alignItems="center"
                        bg={boxBgColor}
                        cursor="pointer"
                        p={4}
                        rounded="lg"
                        transition="background 0.3s ease"
                      >
                        <Flex
                          alignItems="center"
                          h="100%"
                          justify="space-between"
                        >
                          <Flex alignItems="center" flexDirection="row">
                            {user.privateAccount ? (
                              <Text alignItems="center" display="flex">
                                <CiLock />
                              </Text>
                            ) : (
                              <Text alignItems="center" display="flex">
                                <BsGlobeAmericas />
                              </Text>
                            )}
                            <Text ml={2}>{user.username}</Text>
                          </Flex>
                        </Flex>
                      </Box>
                    </Link>
                  ))
                ) : (
                  <Flex>
                    <ShowConditionally variable={!usersFetching}>
                      <ErrorCard
                        key="Search Error"
                        message="There aren't any users that match!"
                        title="No users found 😔"
                        width="100%"
                      />
                    </ShowConditionally>
                  </Flex>
                )}
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    </>
  );
}

export default withUrqlClient(createUrqlClient)(NavUserSearch);
