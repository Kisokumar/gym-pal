import { Button, Flex, useColorMode } from "@chakra-ui/react";

type Props = {
  label: React.ReactNode;
  icon?: React.ReactNode;
  ariaLabel: string;
  loading?: boolean;
  onClickFn?: () => void;
};

export const ProfileModalButton = ({
  label,
  icon,
  ariaLabel,
  loading,
  onClickFn,
}: Props) => {
  const { colorMode } = useColorMode();

  return (
    <Button
      _hover={{
        background: colorMode === "dark" ? "whiteAlpha.100" : "gray.500",
      }}
      aria-label={ariaLabel}
      backgroundColor="transparent"
      color="white"
      fontSize="md"
      fontWeight="medium"
      isLoading={loading || false}
      justifyContent="start"
      p={2}
      size="md"
      w="full"
      onClick={() => {
        if (onClickFn) {
          onClickFn();
        }
      }}
    >
      <Flex gap={2} my={2}>
        {icon}
        {label}
      </Flex>
    </Button>
  );
};
