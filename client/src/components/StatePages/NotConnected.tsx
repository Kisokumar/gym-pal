import { Box, Card, Heading } from "@chakra-ui/react";

import { BiError } from "react-icons/bi";
import CentrePageWrapper from "../Reusable/CentrePageWrapper";
import React from "react";
import { Text } from "@chakra-ui/react";
import Wrapper from "../Reusable/Wrapper";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";

function NotConnected() {
  return (
    <CentrePageWrapper>
      <Wrapper variant="small">
        <>
          <Card overflow="hidden" variant="outline">
            <Box display="flex" flexDirection="column" m={4}>
              <Heading alignItems="center" display="flex" gap={2} size="md">
                <BiError />
                Server Error
              </Heading>
              <Text mt={4}>
                Sorry, we can't connect to the server. Please try again later
              </Text>
            </Box>
          </Card>
        </>
      </Wrapper>
    </CentrePageWrapper>
  );
}
export default withUrqlClient(createUrqlClient, { ssr: true })(NotConnected);
