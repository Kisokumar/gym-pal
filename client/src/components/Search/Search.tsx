import { Card, Flex, useColorModeValue } from "@chakra-ui/react";

import React from "react";
import UserSearch from "./UserSearch";

export default function Search(): JSX.Element {
  const UseColorModeValue = useColorModeValue;
  return (
    <>
      <Flex justifyContent="center" my={2} w="full">
        <Card
          bg={UseColorModeValue("gray.200", "gray.900")}
          flexDir="row"
          maxW="2xl"
          mx={4}
          w="100%"
        >
          <Flex m={4} w="100%">
            <UserSearch pageProps={undefined} placeholder="Search for users!" />
          </Flex>
        </Card>
      </Flex>
    </>
  );
}
