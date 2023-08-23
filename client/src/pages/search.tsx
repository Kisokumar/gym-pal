import { Flex, Spinner } from "@chakra-ui/react";
import { useMeQuery } from "@src/generated/graphql";

import CentrePageWrapper from "@src/components/Reusable/CentrePageWrapper";
import Search from "@src/components/Search/Search";
import { createUrqlClient } from "@src/utils/createUrqlClient";

import { withUrqlClient } from "next-urql";
import React from "react";
import LoggedOutPage from "@src/components/StatePages/LoggedOutPage";

const SearchPage = () => {
  const [{ data: meData, fetching: meFetching }] = useMeQuery();

  const me = meData?.me;

  if (!me && !meFetching) {
    return <LoggedOutPage pageProps={undefined} />;
  } else if (!meFetching) {
    return (
      <Flex justifyContent="center" pt={20}>
        <Search />
      </Flex>
    );
  }

  return (
    <CentrePageWrapper>
      <Spinner size="xl" />
    </CentrePageWrapper>
  );
};

export default withUrqlClient(createUrqlClient)(SearchPage);
