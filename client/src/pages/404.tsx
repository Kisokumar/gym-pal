import { Box, Button, Card, Heading } from "@chakra-ui/react";

import { BiError } from "react-icons/bi";
import { Text } from "@chakra-ui/react";
import Wrapper from "../components/Wrapper";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";

const Custom404Page = () => {
  const router = useRouter();

  return (
    <Box mt="23vh" justifyContent="center" alignItems="center">
      <Wrapper variant="small">
        <>
          <Card overflow="hidden" variant="outline">
            <Box display="flex" flexDirection="column" m={4}>
              <Heading size="md" display="flex" gap={2} alignItems="center">
                <BiError />
                Error 404
              </Heading>
              <Text mt={4}>Oops! This page doesn't exist 😔</Text>
              <Box mt={2} display="flex">
                <Button
                  type="submit"
                  flex={1}
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  Go to home page
                </Button>
              </Box>
            </Box>
          </Card>
        </>
      </Wrapper>
    </Box>
  );
};

export default withUrqlClient(createUrqlClient)(Custom404Page);
