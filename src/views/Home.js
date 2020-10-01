import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button, Container, Menu, Segment } from "semantic-ui-react";
import styles from "../styles/index.module.css";

const Home = (props) => {
  const fixed = false;

  const handleSignIn = () => {
    props.history.push("/sign-in");
  };

  const handleSignUp = () => {
    props.history.push("/sign-up");
  };

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Segment inverted textAlign="center" vertical>
        <Menu
          fixed={fixed ? "top" : null}
          inverted={!fixed}
          // pointing={!fixed}
          secondary={!fixed}
          size="large"
        >
          <Container>
            <Menu.Item active>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item position="right">
              <Button
                className={styles.marginleft}
                inverted={!fixed}
                onClick={handleSignIn}
              >
                Sign In
              </Button>
              <Button
                className={styles.marginleft}
                inverted={!fixed}
                primary={fixed}
                onClick={handleSignUp}
              >
                Sign Up
              </Button>
            </Menu.Item>
          </Container>
        </Menu>
      </Segment>
    </>
  );
};

export default Home;
