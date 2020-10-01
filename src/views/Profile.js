import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import * as AuthService from "../store/services/authService";
import { Button, Container, Menu, Modal, Segment } from "semantic-ui-react";
import styles from "../styles/index.module.css";

const mapStateToProps = (state) => {
  return { user: state.user };
};

const Profile = ({ dispatch, history, user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await dispatch(AuthService.authCheck());
        console.log("auth check: success");
      } catch (err) {
        setError(err.error);
        setIsModalOpen(true);
      }
    };
    checkAuth();
  }, []);

  const fixed = false;
  const handleSignIn = () => {
    history.push("/sign-in");
  };

  // const handleSignUp = () => {
  //   history.push("/sign-up");
  // };

  const handleLogout = async () => {
    try {
      await dispatch(AuthService.logout());
      history.push("/sign-in");
    } catch (err) {
      history.push("/sign-in");
    }
  };

  const closeModal = () => {
    history.push("/sign-in");
  };

  return (
    <>
      <Helmet>
        <title>Profile</title>
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
            <Menu.Item>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item active>
              <Link to="/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item position="right">
              <Button
                className={styles.marginleft}
                inverted={!fixed}
                active={true}
                onClick={handleSignIn}
              >
                Hello, {user.email}
              </Button>
              <Button
                className={styles.marginleft}
                inverted={!fixed}
                primary={fixed}
                compact={true}
                onClick={handleLogout}
                icon="sign out"
              />
            </Menu.Item>
          </Container>
        </Menu>
      </Segment>
      <Modal size="mini" open={isModalOpen}>
        <Modal.Header></Modal.Header>
        <Modal.Content>
          <p>{error}. Please sign-in again.</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="orange" onClick={closeModal}>
            Okay
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default connect(mapStateToProps, null)(Profile);
