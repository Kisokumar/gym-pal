import { Card, Flex, useColorModeValue } from "@chakra-ui/react";

import React from "react";
import UserSearch from "./UserSearch";

export default function Search(): JSX.Element {
  const UseColorModeValue = useColorModeValue;
  return (
    <>
      <Flex my={2} justifyContent={"center"} w={"full"}>
        <Card
          bg={UseColorModeValue("gray.200", "gray.900")}
          w={"100%"}
          maxW={"2xl"}
          mx={4}
          flexDir={"row"}
        >
          <Flex w={"100%"} m={4}>
            <UserSearch placeholder="Search for users!" />
          </Flex>
        </Card>
      </Flex>
    </>
  );
}
