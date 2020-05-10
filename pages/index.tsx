import React from "react";
import { withApollo } from "../libs/apollo";
import { useQuery } from "@apollo/react-hooks";
import { USER } from "../gql/users";
import Layout from "../components/layout";
import { Card, Typography, StylesProvider, Grid } from "@material-ui/core";
import styles from "./general.module.css";

const IndexPage = () => {
  const { loading, error, data } = useQuery(USER, {
    variables: {
      id: "1b65946d-8717-4d1e-8eff-3f4d38f36785",
    },
  });

  console.log(data);

  const loremIpsum =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum bibendum luctus nulla, vel feugiat libero. In nec interdum felis. Fusce fermentum libero sed dolor condimentum hendrerit. Curabitur vel tincidunt diam. Nunc tincidunt, odio et pretium mattis, libero nunc molestie leo, a ultrices turpis est quis tortor. Suspendisse porta, eros at luctus venenatis, tellus sapien pellentesque risus, quis fringilla sem purus non nunc. Vivamus egestas mi dolor, sit amet hendrerit tellus sollicitudin in. Donec ligula mi, ultricies ac finibus in, porttitor et lorem. In suscipit tincidunt nisl id condimentum. In pellentesque est turpis, vel sollicitudin eros condimentum in. Proin a sodales metus. Aliquam dapibus magna ut porta vestibulum. Nulla risus urna, convallis id purus sit amet, interdum fermentum ante. In pharetra nisi eget massa laoreet bibendum.";

  if (error) return <h1>Error</h1>;
  if (loading) return <h1>Loading...</h1>;

  return (
    <Layout>
      <Card className={styles.card}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h5">Login</Typography>
          </Grid>
          <Grid item>{loremIpsum}</Grid>
        </Grid>
      </Card>
    </Layout>
  );
};

export default withApollo({ ssr: true })(IndexPage);
