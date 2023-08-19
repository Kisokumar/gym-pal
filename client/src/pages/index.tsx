import { useMeQuery, useWorkoutSessionsQuery } from "../generated/graphql";

import LoggedOutPage from "../components/LoggedOutPage";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";

const Index = () => {
  const [{ data: workoutSessionsData }] = useWorkoutSessionsQuery();
  const [{ data: meData }] = useMeQuery();
  const sessions = workoutSessionsData?.WorkoutSessions;
  const me = meData?.me;

  if (!me) {
    return <LoggedOutPage pageProps={undefined} />;
  }

  return (
    <div>
      <p>Main Page</p>
      {!sessions ? (
        <p>Error</p>
      ) : (
        sessions.map((p) => <div key={p.id}>{p.sessionType}</div>)
      )}
    </div>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
