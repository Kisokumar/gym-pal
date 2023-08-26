import {
  Popover,
  PopoverTrigger,
  Flex,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  Box,
  useColorMode,
} from "@chakra-ui/react";
import Link from "next/link";
import { MdConstruction } from "react-icons/md";
import { Text } from "@chakra-ui/react";
import StatusIcon from "./StatusIcon";
import { useEffect } from "react";
import { useServerConnectionQuery } from "@src/generated/graphql";

export const NavBetaStatusPopover = () => {
  const { colorMode } = useColorMode();

  const [
    {
      data: serverConnection,
      fetching: fetchingServerConnection,
      stale: staleStatus,
    },
    getConnection,
  ] = useServerConnectionQuery({ requestPolicy: "cache-and-network" });

  useEffect(() => {
    if (staleStatus) {
      getConnection();
    }
  }, [getConnection, staleStatus]);

  return (
    <Box alignItems="center" display={["none", "none", "flex"]} gap={2}>
      <Popover trigger="hover">
        <PopoverTrigger>
          <Flex alignItems="center" gap={2}>
            <Text
              alignItems="center"
              color="white"
              display="flex"
              fontSize="xl"
              gap={2}
            >
              <MdConstruction />
              beta
            </Text>
          </Flex>
        </PopoverTrigger>
        <PopoverContent ml={4}>
          <PopoverArrow />
          <PopoverHeader>We are currently in development,</PopoverHeader>
          <PopoverBody>
            Please report any bugs or request features{" "}
            <Link
              color={colorMode === "light" ? "blue.300" : "blue.700"}
              href="https://github.com/kisokumar/gym-pal/issues"
              target="_blank"
            >
              here.
            </Link>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      {!fetchingServerConnection && (
        <StatusIcon
          pageProps={undefined}
          status={serverConnection?.serverConnection}
        />
      )}
    </Box>
  );
};
