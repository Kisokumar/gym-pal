import { Flex, Switch, useToast } from "@chakra-ui/react";
import { useChangePrivacyMutation, useMeQuery } from "@src/generated/graphql";

import { BsGlobeAmericas } from "react-icons/bs";
import { CiLock } from "react-icons/ci";
import { Text } from "@chakra-ui/react";
import { createUrqlClient } from "@src/utils/createUrqlClient";
import { withUrqlClient } from "next-urql";

export const renderPrivateIcon = (isPrivate: boolean) => (
  <Text alignItems="center" display="flex">
    {isPrivate ? <CiLock /> : <BsGlobeAmericas />}
  </Text>
);

function PrivateAccountSwitch() {
  const toast = useToast();
  const [{ data: userData, fetching: userFetching }] = useMeQuery();
  const [{ fetching: changingPrivacy }, changePrivacy] =
    useChangePrivacyMutation();

  const privateAccount = userData?.me?.privateAccount;
  const disabledState = userFetching || changingPrivacy;

  const renderToastTitle = (accountStatus: string) => (
    <Text>Your account is now {accountStatus}.</Text>
  );

  const handleChangePrivacy = async (value: boolean) => {
    try {
      const changePrivacyResult = await changePrivacy({ isPrivate: value });
      if (
        changePrivacyResult.data?.changePrivacy.user?.privateAccount === value
      ) {
        toast({
          containerStyle: {
            marginBottom: 10,
          },
          duration: 2000,
          icon: renderPrivateIcon(value),
          isClosable: true,
          position: "bottom-right",
          status: "success",
          title: renderToastTitle(value ? "private" : "public"),
          variant: "left-accent",
        });
      } else {
        toast({
          containerStyle: {
            marginBottom: 10,
          },
          duration: 2000,
          isClosable: true,
          position: "bottom-right",
          status: "error",
          title:
            "Sorry, there was an error while changing the privacy on your account.",
          variant: "left-accent",
        });
      }
      if (changePrivacyResult.error) {
        toast({
          containerStyle: {
            marginBottom: 10,
          },
          duration: 2000,
          isClosable: true,
          position: "bottom-right",
          status: "error",
          title:
            "Sorry, there was an error while changing the privacy on your account.",
          variant: "left-accent",
        });
      }
    } catch (error) {
      toast({
        containerStyle: {
          marginBottom: 10,
        },
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
        status: "error",
        title:
          "Sorry, there was an error while changing the privacy on your account.",
        variant: "left-accent",
      });
    }
  };

  return (
    <Flex
      alignItems="center"
      gap={2}
      justifyContent={["space-between", "none", "none"]}
      w="100%"
    >
      <Flex>
        {privateAccount ? (
          <Text alignItems="center" display="flex">
            Private
          </Text>
        ) : (
          <Text alignItems="center" display="flex">
            Public
          </Text>
        )}
      </Flex>
      <Flex gap={2}>
        <Switch
          disabled={disabledState}
          isChecked={privateAccount}
          onChange={(state) => {
            const value = state.currentTarget.checked;
            handleChangePrivacy(value);
          }}
        />
        {privateAccount != null && renderPrivateIcon(privateAccount)}
      </Flex>
    </Flex>
  );
}

export default withUrqlClient(createUrqlClient)(PrivateAccountSwitch);
