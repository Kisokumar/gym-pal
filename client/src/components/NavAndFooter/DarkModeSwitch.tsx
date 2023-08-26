import { useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { NavIcon } from "./NavIcon";

type Props = {
  borderRadius: string;
};

export const DarkModeSwitch = ({ borderRadius }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <NavIcon
      borderRadius={borderRadius || "full"}
      icon={isDark ? <SunIcon boxSize={5} /> : <MoonIcon boxSize={5} />}
      label="Toggle Theme"
      tooltipLabel={isDark ? "Light Mode" : "Dark Mode"}
      onClickFn={toggleColorMode}
    />
  );
};
