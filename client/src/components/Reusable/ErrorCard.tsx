import { Container, Flex, Heading, useColorModeValue } from "@chakra-ui/react";

import React from "react";

interface ErrorCardProps {
  width?: string;
  title: string;
  message?: string;
  secondmessage?: string;
  [x: string]: unknown;
}

export default function ErrorCard(props: ErrorCardProps): JSX.Element {
  const UseColorModeValue = useColorModeValue;
  return (
    <Flex
      direction={"column"}
      rounded={"lg"}
      key={props.title}
      m={4}
      boxShadow={"none"}
      maxH={"100%"}
      w={"max"}
      px={4}
      py={2}
      bg={UseColorModeValue("gray.200", "gray.900")}
      flexGrow={"1"}
      {...props}
    >
      <Heading overflowWrap={"anywhere"} size={"md"}>
        {props.title}
      </Heading>
      <Container
        key={props.message}
        bg={UseColorModeValue("red.400", "red.800")}
        px={4}
        py={2}
        mt={2}
        rounded="lg"
        maxW={"100%"}
      >
        <>
          {props.message}
          <br />
          {props.secondmessage}
        </>
      </Container>
    </Flex>
  );
}
