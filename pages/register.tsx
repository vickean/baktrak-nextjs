import React, { Reducer, useReducer } from "react";
import { withApollo } from "../libs/apollo";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Layout from "../components/layout";
import styles from "./general.module.css";
import {
  Card,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Link,
  Button,
} from "@material-ui/core";
import { FormFieldProps } from "../models/Form";
import { Action } from "../models/Action";
import { LOGIN_USER } from "../gql/users";

interface FormState {
  phoneNo: FormFieldProps;
  password: FormFieldProps;
  role: FormFieldProps;
  name: FormFieldProps;
  email: FormFieldProps;
  confirmPassword: FormFieldProps;
  address: FormFieldProps;
  idPhrase: FormFieldProps;
}

const Register = () => {
  const [loginUser] = useMutation(LOGIN_USER);

  const initialState: FormState = {
    phoneNo: {
      error: false,
      helperText: "",
      value: "",
    },
    password: {
      error: false,
      helperText: "",
      value: "",
    },
    role: {
      error: false,
      helperText: "",
      value: "user",
    },
    name: {
      error: false,
      helperText: "",
      value: "",
    },
    email: {
      error: false,
      helperText: "",
      value: "",
    },
    confirmPassword: {
      error: false,
      helperText: "",
      value: "",
    },
    address: {
      error: false,
      helperText: "",
      value: "",
    },
    idPhrase: {
      error: false,
      helperText: "",
      value: "",
    },
  };

  const reducer: Reducer<FormState, Action> = (prevState, action) => {
    switch (action.type) {
      case "reset":
        return initialState;
      default:
        return { ...prevState, [action.type]: action.payload };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = async () => {
    console.log(state);

    // if (state.role.value === "user") {
    //   const login = await loginUser({
    //     variables: {
    //       phoneNo: state.phoneNo.value.trim(),
    //       password: state.password.value.trim(),
    //     },
    //   });

    //   console.log(login);

    //   localStorage.setItem("id", login.data.loginUser.id);
    // }
  };

  return (
    <Layout back backpath="/">
      <Card className={styles.card}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Register</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Role"
              variant="outlined"
              fullWidth
              select
              value={state.role.value}
              error={state.role.error}
              helperText={state.role.helperText}
              onChange={(e) => {
                dispatch({
                  type: "role",
                  payload: {
                    value: e.target.value,
                    error: false,
                    helperText: "",
                  },
                });
              }}
            >
              <MenuItem key={"user"} value={"user"}>
                User
              </MenuItem>
              <MenuItem key={"premise"} value={"premise"}>
                Premise
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Name"
              variant="outlined"
              fullWidth
              value={state.name.value}
              error={state.name.error}
              helperText={state.name.helperText}
              onChange={(e) => {
                dispatch({
                  type: "name",
                  payload: {
                    value: e.target.value,
                    error: false,
                    helperText: "",
                  },
                });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Phone No."
              variant="outlined"
              fullWidth
              value={state.phoneNo.value}
              error={state.phoneNo.error}
              helperText={state.phoneNo.helperText}
              onChange={(e) => {
                dispatch({
                  type: "phoneNo",
                  payload: {
                    value: e.target.value,
                    error: false,
                    helperText: "",
                  },
                });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Email"
              variant="outlined"
              fullWidth
              value={state.email.value}
              error={state.email.error}
              helperText={state.email.helperText}
              onChange={(e) => {
                dispatch({
                  type: "email",
                  payload: {
                    value: e.target.value,
                    error: false,
                    helperText: "",
                  },
                });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              value={state.password.value}
              error={state.password.error}
              helperText={state.password.helperText}
              onChange={(e) => {
                dispatch({
                  type: "password",
                  payload: {
                    value: e.target.value,
                    error: false,
                    helperText: "",
                  },
                });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Confirm Password"
              variant="outlined"
              fullWidth
              type="password"
              value={state.confirmPassword.value}
              error={state.confirmPassword.error}
              helperText={state.confirmPassword.helperText}
              onChange={(e) => {
                dispatch({
                  type: "confirmPassword",
                  payload: {
                    value: e.target.value,
                    error: false,
                    helperText: "",
                  },
                });
              }}
            />
          </Grid>
          <Grid item xs={12} hidden={state.role.value === "user"}>
            <TextField
              required
              label="idPhrase"
              variant="outlined"
              fullWidth
              type="password"
              value={state.idPhrase.value}
              error={state.idPhrase.error}
              helperText={state.idPhrase.helperText}
              onChange={(e) => {
                dispatch({
                  type: "idPhrase",
                  payload: {
                    value: e.target.value,
                    error: false,
                    helperText: "",
                  },
                });
              }}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              style={{ backgroundColor: "#2fb5a7", color: "white" }}
              onClick={handleSubmit}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Register);
