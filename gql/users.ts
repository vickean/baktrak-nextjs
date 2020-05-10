import gql from "graphql-tag";

export const USER = gql`
  query User($id: String!) {
    User(id: $id) {
      id
      isAdmin
      name
      email
      address
    }
  }
`;
