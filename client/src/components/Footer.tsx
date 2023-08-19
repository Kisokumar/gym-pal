import { Box, Container, Stack, Text, useColorMode } from "@chakra-ui/react";

export default function SmallCentered() {
  const { colorMode } = useColorMode();

  return (
    <Box
      bg={colorMode === "light" ? "gray.50" : "gray.900"}
      color={colorMode === "light" ? "gray.700" : "gray.200"}
      pos="fixed"
      bottom="0"
      w="100%"
    >
      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
        w="100%"
      >
        <Container
          as={Stack}
          maxW={"9xl"}
          py={2}
          direction={{ base: "column", md: "row" }}
          spacing={6}
          justify={{ base: "center", md: "space-between", sm: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text fontSize={"xs"} fontWeight={"hairline"}>
            © 2022 Kisho Makes Stuff. All Rights Reserved.
          </Text>
        </Container>
      </Box>
    </Box>
  );
}
