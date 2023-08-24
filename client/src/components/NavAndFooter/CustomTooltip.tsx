import { Tooltip } from "@chakra-ui/react";

type Props = {
  label: string;
  children: React.ReactNode;
};

export const CustomTooltip = ({ label, children }: Props) => {
  return <Tooltip label={label}>{children}</Tooltip>;
};
