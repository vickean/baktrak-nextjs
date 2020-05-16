import Head from "next/head";
import styles from "./layout.module.css";
import {
  Typography,
  AppBar,
  Toolbar,
  Button,
  Snackbar,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { Reducer, useReducer, useEffect } from "react";
import { Action } from "../models/Action";

interface LayoutState {
  snackBar: boolean;
}

export default function Layout({
  children,
  back,
  logout,
  backpath,
  snackBarState,
  snackBarMsg,
}: {
  children: React.ReactNode;
  back?: boolean;
  logout?: boolean;
  backpath?: string;
  snackBarState?: boolean;
  snackBarMsg?: string;
}) {
  const initialState: LayoutState = {
    snackBar: false,
  };

  const reducer: Reducer<LayoutState, Action> = (prevState, action) => {
    switch (action.type) {
      case "reset":
        return initialState;
      default:
        return { ...prevState, [action.type]: action.payload };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const router = useRouter();

  const handleBack = () => {
    router.push(backpath!);
  };

  const handleLogout = () => {
    localStorage.removeItem("id");
    router.push("/");
  };

  const handleSnackBarClose = () => {
    dispatch({
      type: "snackBar",
      payload: false,
    });
  };

  useEffect(() => {
    if (snackBarState) {
      dispatch({
        type: "snackBar",
        payload: true,
      });
    }
  }, [snackBarState]);

  return (
    <div className={styles.overall}>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <AppBar>
        <Toolbar className={styles.topBar}>
          <Typography variant="h5" className={styles.title}>
            <b>BakTrak</b>
          </Typography>
          {logout ? (
            <Button
              color="inherit"
              style={{ position: "absolute", right: 0, marginRight: "1rem" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : null}
          {back ? (
            <Button
              color="inherit"
              style={{ position: "absolute", right: 0, marginRight: "1rem" }}
              onClick={handleBack}
            >
              Back
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
      <Toolbar />
      <main>{children}</main>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        key={`snackbar`}
        open={state.snackBar}
        onClose={handleSnackBarClose}
        message={snackBarMsg}
      />
    </div>
  );
}
