import React from "react";
import { withApollo } from "../libs/apollo";
import { useQuery } from "@apollo/react-hooks";
import Layout from "../components/layout";

const Register = () => {
  return (
    <Layout>
      <div>
        <h1>Register</h1>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Register);
