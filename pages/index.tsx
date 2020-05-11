import React, { Reducer, useReducer } from "react";
import { withApollo } from "../libs/apollo";
import { useQuery, useLazyQuery, useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "../gql/users";
import Layout from "../components/layout";
import {
  Card,
  Typography,
  StylesProvider,
  Grid,
  TextField,
  Button,
  MenuItem,
} from "@material-ui/core";
import styles from "./general.module.css";
import { FormFieldProps } from "../models/Form";
import { Action } from "../models/Action";
import Link from "next/link";
import { LOGIN_LOCATION } from "../gql/locations";
import { useRouter } from "next/router";

interface FormState {
  phoneNo: FormFieldProps;
  password: FormFieldProps;
  role: FormFieldProps;
}

const IndexPage = () => {
  const router = useRouter();

  const [loginUser] = useMutation(LOGIN_USER);
  const [loginLocation] = useMutation(LOGIN_LOCATION);

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

    if (state.role.value === "user") {
      const login = await loginUser({
        variables: {
          phoneNo: state.phoneNo.value.trim(),
          password: state.password.value.trim(),
        },
      });

      console.log(login);

      localStorage.setItem("id", login.data.loginUser.id);

      if (login.data.loginUser.isAdmin) {
        router.push("/admin/search");
      } else {
        router.push("/user/location-listing");
      }
    }

    if (state.role.value === "premise") {
      const login = await loginLocation({
        variables: {
          phoneNo: state.phoneNo.value.trim(),
          password: state.password.value.trim(),
        },
      });

      console.log(login);

      localStorage.setItem("id", login.data.loginLocation.id);

      router.push("/location/profile");
    }
  };

  return (
    <Layout>
      <Card className={styles.card}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Login</Typography>
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
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Typography>Don't have an account?</Typography>
            <Link href="/register">
              <a>
                <Typography>Sign Up Here</Typography>
              </a>
            </Link>
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              style={{ backgroundColor: "#2fb5a7", color: "white" }}
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Layout>
  );
};

export default withApollo({ ssr: true })(IndexPage);
