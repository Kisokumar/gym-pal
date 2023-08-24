import { IconButton, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { CustomTooltip } from "./CustomTooltip";

type Props = {
  borderRadius: string;
};

export const DarkModeSwitch = ({ borderRadius }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <CustomTooltip label={isDark ? "Light Mode" : "Dark Mode"}>
      <IconButton
        aria-label="Toggle Theme"
        borderRadius={borderRadius || "full"}
        icon={isDark ? <SunIcon /> : <MoonIcon />}
        size="sm"
        onClick={toggleColorMode}
      />
    </CustomTooltip>
  );
};
