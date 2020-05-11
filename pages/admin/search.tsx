import React from "react";
import { withApollo } from "../../libs/apollo";
import { useQuery } from "@apollo/react-hooks";
import Layout from "../../components/layout";

const Search = () => {
  return (
    <Layout logout>
      <div>
        <h1>Search</h1>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Search);
