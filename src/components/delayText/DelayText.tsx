import { FunctionComponent } from "react";
import { motion } from "motion/react";

interface DelayTextProps {
  text: string;
}

const DelayText: FunctionComponent<DelayTextProps> = (props) => {
  const { text } = props;
  return (
    <>
      {text.split("").map((char, i) => (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.25,
            delay: i / 10,
          }}
          key={i}
        >
          {char}
        </motion.span>
      ))}
    </>
  );
};

export default DelayText;
