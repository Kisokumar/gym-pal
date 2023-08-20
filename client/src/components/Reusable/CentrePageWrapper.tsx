import { Box } from "@chakra-ui/react";
import React from "react";

interface WrapperProps {
  children: React.ReactElement;
}

export default function CentrePageWrapper({ children }: WrapperProps) {
  return (
    <Box
      pb={20}
      justifyContent="center"
      alignItems="center"
      h="full"
      justifyItems="center"
      display="flex"
    >
      {children}
    </Box>
  );
}
