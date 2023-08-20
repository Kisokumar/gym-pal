import { Box, Button, Card, Text } from "@chakra-ui/react";

import React from "react";
import Wrapper from "./Wrapper";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";

function Login() {
  const router = useRouter();

  return (
    <Box mt="23vh" justifyContent="center" alignItems="center">
      <Wrapper variant="small">
        <>
          <Card overflow="hidden" variant="outline">
            <Box display="flex" flexDirection="column" m={4}>
              <Text fontSize="xl" display="flex" gap={2} alignItems="center">
                👋 Welcome to GymPal!
              </Text>
              <Box mt={2} display="flex" gap={2}>
                <Button
                  type="submit"
                  flex={1}
                  onClick={() => {
                    router.push("/signup");
                  }}
                >
                  Sign Up
                </Button>
                <Button
                  type="submit"
                  flex={1}
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  Log In
                </Button>
              </Box>
            </Box>
          </Card>
        </>
      </Wrapper>
    </Box>
  );
}
export default withUrqlClient(createUrqlClient, { ssr: true })(Login);
