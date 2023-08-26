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
      bg={UseColorModeValue("gray.200", "gray.900")}
      boxShadow="none"
      direction="column"
      flexGrow="1"
      key={props.title}
      m={4}
      maxH="100%"
      px={4}
      py={2}
      rounded="lg"
      w="max"
      {...props}
    >
      <Heading overflowWrap="anywhere" size="md">
        {props.title}
      </Heading>
      <Container
        bg={UseColorModeValue("red.400", "red.800")}
        key={props.message}
        maxW="100%"
        mt={2}
        px={4}
        py={2}
        rounded="lg"
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
