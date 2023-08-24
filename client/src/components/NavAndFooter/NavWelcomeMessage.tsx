import {
  Box,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { MeQuery } from "@src/generated/graphql";
import { BsGlobeAmericas } from "react-icons/bs";
import { CiLock } from "react-icons/ci";
import Link from "next/link";

type Props = {
  meData: MeQuery;
  iconSize?: number;
};

export const NavWelcomeMessage = ({ meData, iconSize = 12 }: Props) => {
  const { colorMode } = useColorMode();

  return (
    <Box alignItems="center" display={["none", "none", "flex"]}>
      <Popover trigger="hover">
        <PopoverTrigger>
          <Box mx={2}>
            {meData?.me?.privateAccount ? (
              <CiLock color="white" size={iconSize} />
            ) : (
              <BsGlobeAmericas color="white" size={iconSize} />
            )}
          </Box>
        </PopoverTrigger>
        <PopoverContent ml={4}>
          <PopoverArrow />
          <PopoverHeader>
            Profile privacy is set to{" "}
            {meData?.me?.privateAccount ? "private." : "public."}
          </PopoverHeader>
          <PopoverBody>
            <Flex gap={1}>
              <Text>Update it </Text>
              <Link href="/profile">
                <Text color={colorMode === "light" ? "blue.600" : "blue.200"}>
                  here.
                </Text>
              </Link>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Link href="/profile">
        <Text color="white" fontSize="xl" noOfLines={1}>
          Hey {meData?.me?.username}!
        </Text>
      </Link>
    </Box>
  );
};
