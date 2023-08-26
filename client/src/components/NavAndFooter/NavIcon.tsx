import { IconButton } from "@chakra-ui/react";
import { CustomTooltip } from "./CustomTooltip";

type Props = {
  borderRadius?: string;
  label: string;
  icon: React.ReactElement;
  onClickFn?: () => void;
  tooltipLabel: string;
};

export const NavIcon = ({
  borderRadius = "full",
  icon,
  label,
  onClickFn,
  tooltipLabel,
}: Props) => {
  return (
    <CustomTooltip label={tooltipLabel}>
      <IconButton
        aria-label={label}
        borderRadius={borderRadius || "full"}
        icon={icon}
        size="md"
        onClick={() => {
          if (onClickFn) {
            onClickFn();
          }
        }}
      />
    </CustomTooltip>
  );
};
