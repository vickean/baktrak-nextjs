import Head from "next/head";
import styles from "./layout.module.css";
import { Typography, AppBar, Toolbar } from "@material-ui/core";

export default function Layout({ children }: { children: React.ReactNode }) {
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
        </Toolbar>
      </AppBar>
      <Toolbar />
      <main>{children}</main>
    </div>
  );
}
