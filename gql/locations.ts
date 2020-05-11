import gql from "graphql-tag";

export const LOCATION = gql`
  query Location($id: String!) {
    Location(id: $id) {
      id
      name
      phoneNo
      email
      address
      idPhrase
    }
  }
`;

export const LOGIN_LOCATION = gql`
  mutation loginLocation($phoneNo: String!, $password: String!) {
    loginLocation(phoneNo: $phoneNo, password: $password) {
      id
    }
  }
`;
