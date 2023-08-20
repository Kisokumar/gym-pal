import { Box } from "@chakra-ui/react";
import React from "react";

interface WrapperProps {
  children: React.ReactElement;
}

export default function CentrePageWrapper({ children }: WrapperProps) {
  return (
    <Box
      alignItems="center"
      display="flex"
      h="full"
      justifyContent="center"
      justifyItems="center"
      pb={20}
    >
      {children}
    </Box>
  );
}
