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

export const CREATE_LOCATION = gql`
  mutation createLocation(
    $name: String!
    $phoneNo: String!
    $email: String!
    $password: String!
    $address: String!
    $idPhrase: String!
  ) {
    createLocation(
      name: $name
      phoneNo: $phoneNo
      email: $email
      password: $password
      address: $address
      idPhrase: $idPhrase
    )
  }
`;

export const IS_IDPHRASE_TAKEN = gql`
  query isIdPhraseTaken($idPhrase: String!) {
    isIdPhraseTaken(idPhrase: $idPhrase)
  }
`;
