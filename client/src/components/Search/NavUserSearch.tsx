"use client";

import {
  // Box,
  // Card,
  // Divider,
  Flex,
  // IconButton,
  // Input,
  // InputGroup,
  // InputLeftElement,
  // InputRightElement,
  // List,
  // Spacer,
  // useColorModeValue,
} from "@chakra-ui/react";
// import { BsFillPersonCheckFill, BsGlobeAmericas } from "react-icons/bs";
// import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
// import { useRef, useState } from "react";

// import { CiLock } from "react-icons/ci";
// import ErrorCard from "../Reusable/ErrorCard";
// import Link from "next/link";
// import ShowConditionally from "../Reusable/ShowConditionally";
// import { Text } from "@chakra-ui/react";
import { createUrqlClient } from "@src/utils/createUrqlClient";
// import { useUserSearchQuery } from "@src/generated/graphql";
import { withUrqlClient } from "next-urql";

type UserSearchProps = {
  placeholder: string;
  icon?: boolean;
};

function NavUserSearch({ placeholder }: UserSearchProps): JSX.Element {
  // Todo create nav search with popover
  // const [query, setQuery] = useState<string>("");
  // const [isFocused, setIsFocused] = useState(false);

  // const UseColorModeValue = useColorModeValue;

  // const searchInputRef = useRef<HTMLInputElement | null>(null);

  // const [{ data: usersData, fetching: usersFetching }, reFetchUsers] =
  //   useUserSearchQuery({
  //     requestPolicy: "network-only",
  //     variables: { search: query },
  //   });

  // const handleFocus = () => {
  //   setIsFocused(true);
  // };

  // const handleSearch = (e: string) => {
  //   setQuery(e);
  //   reFetchUsers({
  //     variables: { search: e },
  //   });
  // };

  // const users = usersData?.users?.users;

  return (
    <>
      <Flex
        alignItems={"center"}
        direction={"column"}
        justifyContent={"center"}
        maxW={"2xl"}
        w={"full"}
      >
        {placeholder}
      </Flex>
    </>
  );
}

export default withUrqlClient(createUrqlClient)(NavUserSearch);
