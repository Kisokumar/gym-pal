import { Flex, Spinner } from "@chakra-ui/react";
import { useMeQuery, useWorkoutSessionsQuery } from "@src/generated/graphql";

import CentrePageWrapper from "@src/components/Reusable/CentrePageWrapper";
import Search from "@src/components/Search/Search";
import WelcomePage from "@src/components/StatePages/WelcomePage";
import { createUrqlClient } from "@src/utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import React from "react";

const Index = () => {
  const [{ data: workoutSessionsData, fetching: workoutsFetching }] =
    useWorkoutSessionsQuery();
  const [{ data: meData, fetching: meFetching }] = useMeQuery();

  const sessions = workoutSessionsData?.WorkoutSessions;
  const me = meData?.me;

  if (!me && !meFetching) {
    return <WelcomePage pageProps={undefined} />;
  } else if (!meFetching && !workoutsFetching) {
    return (
      <Flex justifyContent="center" pt={20}>
        <>
          <Search />
          {!sessions ? (
            <p>Error</p>
          ) : (
            sessions.map((p) => <div key={p.id}>{p.sessionType}</div>)
          )}
        </>
      </Flex>
    );
  }
  return (
    <CentrePageWrapper>
      <Spinner size="xl" />
    </CentrePageWrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
