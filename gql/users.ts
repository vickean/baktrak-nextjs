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

export const LOGIN_USER = gql`
  mutation loginUser($phoneNo: String!, $password: String!) {
    loginUser(phoneNo: $phoneNo, password: $password) {
      id
      isAdmin
    }
  }
`;
