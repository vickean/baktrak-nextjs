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

export const CREATE_USER = gql`
  mutation createuser(
    $name: String!
    $phoneNo: String!
    $email: String!
    $password: String!
    $address: String!
  ) {
    createUser(
      name: $name
      phoneNo: $phoneNo
      email: $email
      password: $password
      address: $address
    )
  }
`;
