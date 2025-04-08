import { decode } from "../../utils/hashing";
import "./Home.scss";
import { FunctionComponent, useMemo } from "react";
import { motion } from "motion/react";
import { Outlet } from "react-router";
import DelayText from "../../components/delayText/DelayText";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const user = decode(localStorage.getItem("user"));

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const userGreetings = useMemo(
    () => `${getGreeting()} ${user?.user_name} !`,
    []
  );

  return (
    <div className="home">
      <header className="home-header">ANME - Secret Santa Game</header>

      <section className="home-section">
        <header className="home-greeting">
          <DelayText text={userGreetings} />
        </header>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: userGreetings.split("").length / 10,
            duration: 0.25,
          }}
          className="main"
        >
          <Outlet />
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
