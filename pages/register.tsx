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
import { CREATE_USER } from "../gql/users";
import { useRouter } from "next/router";
import { CREATE_LOCATION } from "../gql/locations";

interface FormState {
  phoneNo: FormFieldProps;
  password: FormFieldProps;
  role: FormFieldProps;
  name: FormFieldProps;
  email: FormFieldProps;
  confirmPassword: FormFieldProps;
  address: FormFieldProps;
  idPhrase: FormFieldProps;
  snackBar: boolean;
}

const Register = () => {
  const router = useRouter();

  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: () => {
      dispatch({
        type: "snackBar",
        payload: true,
      });

      router.push("/");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const [createLocation] = useMutation(CREATE_LOCATION, {
    onCompleted: () => {
      dispatch({
        type: "snackBar",
        payload: true,
      });

      router.push("/");
    },
    onError: (err) => {
      console.log(err);
    },
  });

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
    snackBar: false,
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

    let err: boolean = false;

    if (state.password.value !== state.confirmPassword.value) {
      err = true;
      dispatch({
        type: "confirmPassword",
        payload: {
          value: state.confirmPassword.value,
          error: true,
          helperText: "Passwords do not match!",
        },
      });
    }

    if (err) return;

    if (state.role.value === "user") {
      createUser({
        variables: {
          name: state.name.value.trim(),
          phoneNo: state.phoneNo.value.trim(),
          email: state.email.value.trim(),
          password: state.password.value.trim(),
          address: state.address.value.trim(),
        },
      });
    }

    if (state.role.value === "premise") {
      createLocation({
        variables: {
          name: state.name.value.trim(),
          phoneNo: state.phoneNo.value.trim(),
          email: state.email.value.trim(),
          password: state.password.value.trim(),
          address: state.address.value.trim(),
          idPhrase: state.idPhrase.value.trim(),
        },
      });
    }
  };

  return (
    <Layout
      back
      backpath="/"
      snackBarState={state.snackBar}
      snackBarMsg="Registration complete"
    >
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
              label="Address"
              variant="outlined"
              fullWidth
              multiline
              value={state.address.value}
              error={state.address.error}
              helperText={state.address.helperText}
              onChange={(e) => {
                dispatch({
                  type: "address",
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
