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
        background: colorMode === "dark" ? "gray.800" : "gray.500",
        color: "white",
      }}
      aria-label={ariaLabel}
      backgroundColor="transparent"
      fontSize="sm"
      fontWeight="medium"
      isLoading={loading || false}
      justifyContent="start"
      size="sm"
      w={"full"}
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
