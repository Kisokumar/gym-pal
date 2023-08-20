import { useMeQuery, useWorkoutSessionsQuery } from "../generated/graphql";

import { Flex } from "@chakra-ui/react";
import Search from "../components/Search/Search";
import WelcomePage from "../components/Reusable/WelcomePage";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";

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
    <>
      <p>Main Page</p>
      {!sessions ? (
        <p>Error</p>
      ) : (
        sessions.map((p) => <div key={p.id}>{p.sessionType}</div>)
      )}
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
