import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { Text } from "@chakra-ui/react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useDeleteAccountMutation } from "../../generated/graphql";
import { withUrqlClient } from "next-urql";

function PrivateAccountSwitch() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ fetching: deletingAccount }, deleteAccount] =
    useDeleteAccountMutation();

  const toast = useToast();

  const handleDelete = async () => {
    try {
      const deleteResult = await deleteAccount({});

      if (deleteResult.data?.deleteAccount) {
        toast({
          title: `Your account was deleted!`,
          variant: "left-accent",
          status: "success",
          position: "bottom-right",
          duration: 600,
          isClosable: true,
        });
      } else {
        toast({
          title: "Sorry, there was an error while deleting your account.",
          variant: "left-accent",
          status: "error",
          duration: 600,
          position: "bottom-right",
          isClosable: true,
        });
      }
      onClose();
    } catch (error) {
      toast({
        title: "Sorry, there was an error while deleting your account.",
        variant: "left-accent",
        status: "error",
        duration: 600,
        position: "bottom-right",
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button
        size="sm"
        maxW={80}
        onClick={onOpen}
        _hover={{
          bg: "red.500",
          color: "black",
        }}
      >
        Delete Account
      </Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              This action is irreversible and you will lose access to your
              account permanently!
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              maxW={80}
              isLoading={deletingAccount}
              onClick={async () => {
                handleDelete();
              }}
              _hover={{
                bg: "red.500",
                color: "black",
              }}
            >
              Confirm Deletion
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default withUrqlClient(createUrqlClient)(PrivateAccountSwitch);
