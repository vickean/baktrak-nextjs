import React, { useEffect } from "react";
import { withApollo } from "../../libs/apollo";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import Layout from "../../components/layout";
import styles from "../general.module.css";
import {
  Card,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Link,
  Button,
} from "@material-ui/core";
import { LOCATION } from "../../gql/locations";

const Profile = () => {
  const [getLocation, { data, error, loading }] = useLazyQuery(LOCATION);

  useEffect(() => {
    const id = localStorage.getItem("id");

    getLocation({
      variables: {
        id,
      },
    });
  }, []);

  console.log(data);

  return (
    <Layout logout>
      <Card className={styles.card}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Premise Profile</Typography>
          </Grid>
          <Grid item container xs={12}>
            <Typography variant="body1">
              <b>Premise Name :</b>
            </Typography>
          </Grid>
          <Grid item container xs={12}>
            <Typography variant="body1">{data?.Location.name}</Typography>
          </Grid>
          <Grid item container xs={12}>
            <Typography variant="body1">
              <b>Phone No. :</b>
            </Typography>
          </Grid>
          <Grid item container xs={12}>
            <Typography variant="body1">{data?.Location.phoneNo}</Typography>
          </Grid>
          <Grid item container xs={12}>
            <Typography variant="body1">
              <b>Email :</b>
            </Typography>
          </Grid>
          <Grid item container xs={12}>
            <Typography variant="body1">{data?.Location.email}</Typography>
          </Grid>
          <Grid item container xs={12}>
            <Typography variant="body1">
              <b>Address :</b>
            </Typography>
          </Grid>
          <Grid item container xs={12}>
            <Typography variant="body1">{data?.Location.address}</Typography>
          </Grid>
          <Grid item container xs={12}>
            <Typography variant="body1">
              <b>idPhrase :</b>
            </Typography>
          </Grid>
          <Grid item container xs={12}>
            <Typography variant="h4">{data?.Location.idPhrase}</Typography>
          </Grid>
        </Grid>
      </Card>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Profile);
