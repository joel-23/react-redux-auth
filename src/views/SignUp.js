import React, { useState } from "react";
import * as AuthService from "../store/services/authService";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  Button,
  Card,
  Form,
  Grid,
  Header,
  Icon,
  Input,
  Label,
  Message,
  Modal,
} from "semantic-ui-react";
import styles from "../styles/index.module.css";
import { connect } from "react-redux";

const SignUp = ({ dispatch, history }) => {
  const [formState, setFormState] = useState({});
  const [error, setError] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(AuthService.signup(formState));
      console.log("signup: success");
      history.push("/profile");
    } catch (err) {
      console.log("error");
      console.log(err);
      setError(err.error);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Sign up</title>
      </Helmet>
      <Grid className={styles.grid}>
        <Grid.Column className={styles.main}>
          <Header as="h2" inverted={true} className={styles.heading}>
            <Icon name="sign in" />
            <Header.Content>Create a new account</Header.Content>
          </Header>
          <Card fluid color="orange" raised={true}>
            <Form
              size="large"
              onSubmit={handleSubmit}
              className={styles.card_form}
            >
              <Form.Field>
                <Label basic={true}>Email Address</Label>
                <Input
                  name="email"
                  icon="mail"
                  iconPosition="left"
                  placeholder="Enter email address"
                  value={formState.email || ""}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Label basic={true}>Password</Label>
                <Input
                  inverted={true}
                  name="password"
                  icon="key"
                  iconPosition="left"
                  placeholder="Enter email address"
                  type="password"
                  value={formState.password || ""}
                  onChange={handleChange}
                />
              </Form.Field>
              <Button inverted color="orange">
                Sign Up
              </Button>
            </Form>
          </Card>
          <Message>
            Already a member? <Link to="/sign-in">Sign In</Link>
          </Message>
        </Grid.Column>
      </Grid>
      <Modal size="mini" open={isModalOpen}>
        <Modal.Header></Modal.Header>
        <Modal.Content>
          <p>{error}</p>
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

export default connect(null, null)(SignUp);
