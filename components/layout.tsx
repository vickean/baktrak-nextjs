import Head from "next/head";
import styles from "./layout.module.css";
import { Typography, AppBar, Toolbar, Button } from "@material-ui/core";
import { useRouter } from "next/router";

export default function Layout({
  children,
  back,
  logout,
  backpath,
}: {
  children: React.ReactNode;
  back?: boolean;
  logout?: boolean;
  backpath?: string;
}) {
  const router = useRouter();

  const handleBack = () => {
    router.push(backpath!);
  };

  const handleLogout = () => {
    localStorage.removeItem("id");
    router.push("/");
  };

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
    </div>
  );
}
