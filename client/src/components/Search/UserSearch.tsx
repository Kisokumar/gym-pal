"use client";

import {
  Box,
  Card,
  Divider,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  List,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsFillPersonCheckFill, BsGlobeAmericas } from "react-icons/bs";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";

import { CiLock } from "react-icons/ci";
import ErrorCard from "../Reusable/ErrorCard";
import Link from "next/link";
import ShowConditionally from "../Reusable/ShowConditionally";
import { Text } from "@chakra-ui/react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useUserSearchQuery } from "../../generated/graphql";
import { withUrqlClient } from "next-urql";

type UserSearchProps = {
  placeholder: string;
};

function UserSearch({ placeholder }: UserSearchProps): JSX.Element {
  const [query, setQuery] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);

  const UseColorModeValue = useColorModeValue;

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const [{ data: usersData, fetching: usersFetching }, reFetchUsers] =
    useUserSearchQuery({
      variables: { search: query },
      requestPolicy: "network-only",
    });

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    reFetchUsers({
      variables: { search: query },
    });
  }, [reFetchUsers, query]);

  const users = usersData?.users?.users;

  return (
    <>
      <Flex
        w={"full"}
        justifyContent={"center"}
        alignItems={"center"}
        direction={"column"}
        maxW={"2xl"}
      >
        <Flex
          alignContent={"center"}
          justifyContent={"center"}
          w={"full"}
          rounded={"lg"}
          direction={["column", "row", "row"]}
          maxW={"2xl"}
        >
          <Box w={"full"}>
            <Flex
              display={"flex"}
              justify={"center"}
              align={"center"}
              w={"full"}
              maxW={"2xl"}
            >
              <Card
                boxShadow={"none"}
                maxW={"2xl"}
                w={"100%"}
                bg={UseColorModeValue("gray.200", "gray.900")}
                flexDir={"column"}
                zIndex={6}
              >
                <Flex maxW={"2xl"} w={"100%"}>
                  <InputGroup maxW={"2xl"}>
                    <InputLeftElement pointerEvents="none" pl={4}>
                      <BsFillPersonCheckFill size={19} />
                    </InputLeftElement>

                    <Input
                      rounded={"full"}
                      value={query}
                      onFocus={handleFocus}
                      onChange={handleSearch}
                      ref={searchInputRef}
                      borderColor={UseColorModeValue("gray.300", "gray.700")}
                      focusBorderColor={UseColorModeValue(
                        "purple.900",
                        "gray.600"
                      )}
                      placeholder={placeholder || "Placeholder"}
                      pl={12}
                      onSubmit={(e) => {
                        if (e.currentTarget.value !== "") {
                          // handleSubmit(e);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.currentTarget.value !== "") {
                          // handleSubmit(e);
                        }
                      }}
                    />
                    {query !== "" && (
                      <InputRightElement>
                        <IconButton
                          rounded={"full"}
                          bg={"transparent"}
                          _hover={{ color: "#ebedf0" }}
                          size={"xs"}
                          aria-label="Clear Search"
                          icon={<CloseIcon />}
                          onClick={(e) => {
                            e.preventDefault();
                            setQuery("");
                            searchInputRef?.current?.focus();
                          }}
                        />
                      </InputRightElement>
                    )}
                  </InputGroup>
                  <Flex align={"center"}>
                    <IconButton
                      isDisabled={query === ""}
                      ml={2}
                      rounded={"full"}
                      colorScheme="gray"
                      aria-label="Search Stock"
                      icon={<SearchIcon />}
                      onClick={(e) => {
                        if (query !== "") {
                          // handleSubmit(e);
                        }
                      }}
                    />
                  </Flex>
                </Flex>
                <Spacer />
              </Card>
            </Flex>
            <ShowConditionally variable={query !== "" && isFocused}>
              <Box
                maxW={"2xl"}
                pos={"absolute"}
                display={isFocused ? "block" : "none"}
                zIndex={5}
                bg={UseColorModeValue("gray.200", "gray.900")}
                p={4}
                mt={-3}
                w={"full"}
                left={0}
                roundedBottom={"lg"}
              >
                <Box maxH={"lg"} overflowY={"auto"} overflowX={"hidden"}>
                  <List maxW={["sm", "2xl", "2xl"]} mt={2}>
                    <Divider mb={3}></Divider>
                    <Flex gap={2} flexDirection={"column"}>
                      {users && users?.length > 0 ? (
                        users.map((user) => (
                          <Link key={user.username} href={`/user/account`}>
                            <Box
                              bg={UseColorModeValue(
                                "blackAlpha.100",
                                "whiteAlpha.100"
                              )}
                              rounded={"lg"}
                              p={4}
                              alignItems={"center"}
                              cursor={"pointer"}
                              transition={"background 0.3s ease"}
                              _hover={{
                                bg: UseColorModeValue(
                                  "blackAlpha.200",
                                  "whiteAlpha.200"
                                ),
                              }}
                            >
                              <Flex
                                justify={"space-between"}
                                h={"100%"}
                                alignItems="center"
                              >
                                <Flex
                                  alignItems={"center"}
                                  flexDirection={"row"}
                                >
                                  {user.privateAccount ? (
                                    <Text alignItems="center" display="flex">
                                      <CiLock color="white" />
                                    </Text>
                                  ) : (
                                    <Text alignItems="center" display="flex">
                                      <BsGlobeAmericas color="white" />
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
                          <ShowConditionally
                            variable={query !== "" && !usersFetching}
                          >
                            <ErrorCard
                              width="100%"
                              key="Search Error"
                              title="No users found 😔"
                              message="There aren't any users that match!"
                            />
                          </ShowConditionally>
                        </Flex>
                      )}
                    </Flex>
                  </List>
                </Box>
              </Box>
            </ShowConditionally>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export default withUrqlClient(createUrqlClient)(UserSearch);
