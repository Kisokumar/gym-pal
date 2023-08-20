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
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";

function DeleteAccountButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ fetching: deletingAccount }, deleteAccount] =
    useDeleteAccountMutation();

  const router = useRouter();
  const toast = useToast();

  const handleDelete = async () => {
    try {
      const deleteResult = await deleteAccount({});

      if (deleteResult.data?.deleteAccount) {
        toast({
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
          status: "success",
          title: `Your account was deleted!`,
          variant: "left-accent",
        });
      } else {
        toast({
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
          status: "error",
          title: "Sorry, there was an error while deleting your account.",
          variant: "left-accent",
        });
      }
    } catch (error) {
      toast({
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
        status: "error",
        title: "Sorry, there was an error while deleting your account.",
        variant: "left-accent",
      });
    }
    onClose();
    router.push("/login");
  };

  return (
    <>
      <Button
        _hover={{
          bg: "red.500",
          color: "black",
        }}
        maxW={80}
        size="sm"
        onClick={onOpen}
      >
        Delete Account
      </Button>
      <Modal
        isOpen={isOpen}
        motionPreset="slideInBottom"
        isCentered
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader>Delete Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              This action is irreversible and you will lose access to your
              account permanently!
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              _hover={{
                bg: "red.500",
                color: "black",
              }}
              isLoading={deletingAccount}
              maxW={80}
              mr={3}
              onClick={async () => {
                handleDelete();
              }}
            >
              Confirm Deletion
            </Button>{" "}
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default withUrqlClient(createUrqlClient)(DeleteAccountButton);
