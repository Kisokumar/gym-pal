import { Box, Container, Stack, Text, useColorMode } from "@chakra-ui/react";

export default function SmallCentered() {
  const { colorMode } = useColorMode();

  return (
    <Box
      bg={colorMode === "light" ? "gray.50" : "gray.900"}
      bottom="0"
      color={colorMode === "light" ? "gray.700" : "gray.200"}
      pos="fixed"
      w="100%"
    >
      <Box
        borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
        borderStyle="solid"
        borderTopWidth={1}
        w="100%"
      >
        <Container
          align={{ base: "center", md: "center" }}
          as={Stack}
          direction={{ base: "column", md: "row" }}
          justify={{ base: "center", md: "space-between", sm: "space-between" }}
          maxW="9xl"
          py={2}
          spacing={6}
        >
          <Text fontSize="xs" fontWeight="hairline">
            © 2022 Kisho Makes Stuff. All Rights Reserved.
          </Text>
        </Container>
      </Box>
    </Box>
  );
}
