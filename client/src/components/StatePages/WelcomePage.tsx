import { Box, Button, Card, Text } from "@chakra-ui/react";

import CentrePageWrapper from "../Reusable/CentrePageWrapper";
import Wrapper from "../Reusable/Wrapper";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import React from "react";

function Login() {
  const router = useRouter();

  return (
    <CentrePageWrapper>
      <Wrapper variant="small">
        <>
          <Card overflow="hidden" variant="outline">
            <Box display="flex" flexDirection="column" m={4}>
              <Text alignItems="center" display="flex" fontSize="xl" gap={2}>
                👋 Welcome to GymPal!
              </Text>
              <Box display="flex" gap={2} mt={2}>
                <Button
                  flex={1}
                  type="submit"
                  onClick={() => {
                    router.push("/signup");
                  }}
                >
                  Sign Up
                </Button>
                <Button
                  flex={1}
                  type="submit"
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
    </CentrePageWrapper>
  );
}
export default withUrqlClient(createUrqlClient, { ssr: true })(Login);
