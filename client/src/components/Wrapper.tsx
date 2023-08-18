import { Box } from "@chakra-ui/react";
import React from "react";

interface WrapperProps {
  children: React.ReactElement;
  variant?: "small" | "regular";
}

export default function Wrapper({
  children,
  variant = "regular",
}: WrapperProps) {
  return (
    <Box maxW={variant === "small" ? "400px" : "800px"} mt={8} mx="auto">
      {children}
    </Box>
  );
}
