import { Flex, Switch } from "@chakra-ui/react";
import {
  useChangePrivacyMutation,
  useProfileQuery,
} from "../../generated/graphql";

import { BsGlobeAmericas } from "react-icons/bs";
import { CiLock } from "react-icons/ci";
import { Text } from "@chakra-ui/react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";

function PrivateAccountSwitch() {
  const [{ data: userData, fetching: userFetching }] = useProfileQuery();
  const [{ fetching: changingPrivacy }, changePrivacy] =
    useChangePrivacyMutation();

  const privateAccount = userData?.me?.privateAccount;
  const disabledState = userFetching || changingPrivacy;

  return (
    <Flex
      alignItems="center"
      gap={2}
      justifyContent={["space-between", "none", "none"]}
      w="100%"
    >
      <Flex>
        {privateAccount ? (
          <Text display="flex" alignItems="center">
            Private Account
          </Text>
        ) : (
          <Text display="flex" alignItems="center">
            Public Account
          </Text>
        )}
      </Flex>
      <Flex gap={2}>
        <Switch
          disabled={disabledState}
          isChecked={privateAccount}
          onChange={(state) => {
            const value = state.currentTarget.checked;
            changePrivacy({ isPrivate: value });
          }}
        />
        {privateAccount ? (
          <Text display="flex" alignItems="center">
            <CiLock color="white" />
          </Text>
        ) : (
          <Text display="flex" alignItems="center">
            <BsGlobeAmericas color="white" />
          </Text>
        )}
      </Flex>
    </Flex>
  );
}

export default withUrqlClient(createUrqlClient)(PrivateAccountSwitch);
