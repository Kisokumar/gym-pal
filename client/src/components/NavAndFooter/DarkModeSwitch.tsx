import { IconButton, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <IconButton
      aria-label="Toggle Theme"
      icon={isDark ? <SunIcon /> : <MoonIcon />}
      size="sm"
      onClick={toggleColorMode}
    />
  );
};
