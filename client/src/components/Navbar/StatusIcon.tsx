import { Tooltip } from "@chakra-ui/react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { motion } from "framer-motion";
import { withUrqlClient } from "next-urql";

type Props = {
  status: string;
};

function StatusIcon({ status }: Props) {
  return (
    <Tooltip
      label={
        status !== undefined
          ? "Connected to server!"
          : "No connection to server!"
      }
    >
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0.5, scale: 0.9 }}
        style={{
          backgroundColor: status !== undefined ? "green" : "red",
          borderRadius: "50%",
          height: "20px",
          width: "20px",
        }}
        transition={{
          duration: 1.3,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
      >
        <motion.div
          animate={{ opacity: 0, scale: 1.9 }}
          initial={{ opacity: 0.4, scale: 1 }}
          style={{
            backgroundColor: status !== undefined ? "green" : "red",
            borderRadius: "50%",
            height: "20px",
            width: "20px",
          }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            // repeatType: "mirror",
            // ease: "easeInOut"
          }}
        />
      </motion.div>
    </Tooltip>
  );
}

export default withUrqlClient(createUrqlClient)(StatusIcon);
