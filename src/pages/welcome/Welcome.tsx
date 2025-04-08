import { Button } from "@mui/material";
import DelayText from "../../components/delayText/DelayText";
import "./Welcome.scss";
import { FunctionComponent } from "react";
import { motion } from "motion/react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import TextFieldController from "../../components/TextField/TextFieldController";
import { z } from "zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { welcomeText } from "./IWelcome";
import { useNavigate } from "react-router";
import { encode } from "../../utils/hashing";

interface WelcomeProps {}

const Welcome: FunctionComponent<WelcomeProps> = () => {
  const nav = useNavigate();

  const welcomeText = "Welcome to the Secret Santa Game!";

  // schema
  const userSchema = z.object({
    user_name: z.string({ message: "Please enter user name" }),
  });

  // form
  const methods = useForm<welcomeText>({
    resolver: zodResolver(userSchema),
  });

  // form submit
  const onSubmit: SubmitHandler<welcomeText> = (val) => {
    localStorage.setItem("user", encode(val));
    nav("/game");
    console.log(val);
  };

  return (
    <FormProvider {...methods}>
      <form className="welcome-page" onSubmit={methods.handleSubmit(onSubmit)}>
        <header className="welcome-header">
          <DelayText text={welcomeText} />
        </header>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: welcomeText.split("").length / 10,
            duration: 0.25,
          }}
          className="welcome-section"
        >
          <TextFieldController name="user_name" placeholder="User" />
          <Button
            variant="contained"
            type="submit"
            endIcon={<KeyboardArrowRightIcon />}
          >
            Get Start
          </Button>
        </motion.section>
      </form>
    </FormProvider>
  );
};

export default Welcome;
