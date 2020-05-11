import React from "react";
import { withApollo } from "../../libs/apollo";
import { useQuery } from "@apollo/react-hooks";
import Layout from "../../components/layout";

const CheckIn = () => {
  return (
    <Layout>
      <div>
        <h1>CheckIn</h1>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: true })(CheckIn);
