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
    onClose();
    router.push("/login");
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
              maxW={80}
              mr={3}
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
            </Button>{" "}
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default withUrqlClient(createUrqlClient)(DeleteAccountButton);