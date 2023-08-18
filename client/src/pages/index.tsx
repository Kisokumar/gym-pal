import { createUrqlClient } from "../utils/createUrqlClient";
import { useWorkoutSessionsQuery } from "../generated/graphql";
import { withUrqlClient } from "next-urql";

const Index = () => {
  const [{ data }] = useWorkoutSessionsQuery();

  return (
    <div>
      <p>Main Page</p>
      {!data ? (
        <p>dasd</p>
      ) : (
        data.WorkoutSessions.map((p) => <div key={p.id}>{p.sessionType}</div>)
      )}
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
