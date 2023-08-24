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
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";

import { CiLock } from "react-icons/ci";
import ErrorCard from "../Reusable/ErrorCard";
import Link from "next/link";
import ShowConditionally from "../Reusable/ShowConditionally";
import { Text } from "@chakra-ui/react";
import { createUrqlClient } from "@src/utils/createUrqlClient";
import { useUserSearchQuery } from "@src/generated/graphql";
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
      requestPolicy: "network-only",
      variables: { search: query },
    });

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleSearch = (e: string) => {
    setQuery(e);
    reFetchUsers({
      variables: { search: e },
    });
  };

  const users = usersData?.users?.users;

  return (
    <>
      <Flex
        alignItems={"center"}
        direction={"column"}
        justifyContent={"center"}
        maxW={"2xl"}
        w={"full"}
      >
        <Flex
          alignContent={"center"}
          direction={["column", "row", "row"]}
          justifyContent={"center"}
          maxW={"2xl"}
          rounded={"lg"}
          w={"full"}
        >
          <Box w={"full"}>
            <Flex
              align={"center"}
              display={"flex"}
              justify={"center"}
              maxW={"2xl"}
              w={"full"}
            >
              <Card
                bg={UseColorModeValue("gray.200", "gray.900")}
                boxShadow={"none"}
                flexDir={"column"}
                maxW={"2xl"}
                w={"100%"}
                zIndex={6}
              >
                <Flex maxW={"2xl"} w={"100%"}>
                  <InputGroup maxW={"2xl"}>
                    <InputLeftElement pl={4} pointerEvents="none">
                      <BsFillPersonCheckFill size={19} />
                    </InputLeftElement>

                    <Input
                      borderColor={UseColorModeValue("gray.300", "gray.700")}
                      focusBorderColor={UseColorModeValue(
                        "purple.900",
                        "gray.600"
                      )}
                      pl={12}
                      placeholder={placeholder || "Placeholder"}
                      ref={searchInputRef}
                      rounded={"full"}
                      onChange={(e) => {
                        handleSearch(e.currentTarget.value);
                      }}
                      onFocus={handleFocus}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.currentTarget.value !== "") {
                          // handleSubmit(e);
                        }
                      }}
                      onSubmit={(e) => {
                        if (e.currentTarget.value !== "") {
                          // handleSubmit(e);
                        }
                      }}
                    />
                    {query !== "" && (
                      <InputRightElement>
                        <IconButton
                          _hover={{ color: "#ebedf0" }}
                          aria-label="Clear Search"
                          bg={"transparent"}
                          icon={<CloseIcon />}
                          rounded={"full"}
                          size={"xs"}
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
                      aria-label="Search GymPal"
                      colorScheme="gray"
                      icon={<SearchIcon />}
                      isDisabled={query === ""}
                      ml={2}
                      rounded={"full"}
                      onClick={() => {
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
                bg={UseColorModeValue("gray.200", "gray.900")}
                display={isFocused ? "block" : "none"}
                left={0}
                maxW={"2xl"}
                mt={-3}
                p={4}
                pos={"absolute"}
                roundedBottom={"lg"}
                w={"full"}
                zIndex={5}
              >
                <Box maxH={"lg"} overflowX={"hidden"} overflowY={"auto"}>
                  <List maxW={["2xl", "2xl", "2xl"]} mt={2}>
                    <Divider mb={3}></Divider>
                    <Flex flexDirection={"column"} gap={2}>
                      {users && users?.length > 0 ? (
                        users.map((user) => (
                          <Link href={`/user/account`} key={user.username}>
                            <Box
                              _hover={{
                                bg: UseColorModeValue(
                                  "blackAlpha.200",
                                  "whiteAlpha.200"
                                ),
                              }}
                              alignItems={"center"}
                              bg={UseColorModeValue(
                                "blackAlpha.100",
                                "whiteAlpha.100"
                              )}
                              cursor={"pointer"}
                              p={4}
                              rounded={"lg"}
                              transition={"background 0.3s ease"}
                            >
                              <Flex
                                alignItems="center"
                                h={"100%"}
                                justify={"space-between"}
                              >
                                <Flex
                                  alignItems={"center"}
                                  flexDirection={"row"}
                                >
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
                          <ShowConditionally
                            variable={query !== "" && !usersFetching}
                          >
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
