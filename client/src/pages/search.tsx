import { Flex, Spinner } from "@chakra-ui/react";
import { useMeQuery } from "@src/generated/graphql";

import CentrePageWrapper from "@src/components/Reusable/CentrePageWrapper";
import Search from "@src/components/Search/Search";
import { createUrqlClient } from "@src/utils/createUrqlClient";

import { withUrqlClient } from "next-urql";
import React from "react";
import LoggedOutPage from "@src/components/StatePages/LoggedOutPage";
import Head from "next/head";

const SearchPage = () => {
  const [{ data: meData, fetching: meFetching }] = useMeQuery();

  const me = meData?.me;

  if (!me && !meFetching) {
    return <LoggedOutPage pageProps={undefined} />;
  } else if (!meFetching) {
    return (
      <>
        <Head>
          <title>Search • GymPal</title>
          <meta
            content="gympal - your ultimate fitness tracking companion. achieve your fitness goals with gympal, the all-in-one platform to track and visualize your gym progress. connect with friends, view their profiles, and compare workout statistics."
            name="description"
          />
        </Head>
        <Flex justifyContent="center" pt={20}>
          <Search />
        </Flex>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Search • GymPal</title>
        <meta
          content="gympal - your ultimate fitness tracking companion. achieve your fitness goals with gympal, the all-in-one platform to track and visualize your gym progress. connect with friends, view their profiles, and compare workout statistics."
          name="description"
        />
      </Head>
      <CentrePageWrapper>
        <Spinner size="xl" />
      </CentrePageWrapper>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(SearchPage);
