import gql from "graphql-tag";

export const USERLOCASG_LIST = gql`
  query UserLocAsgList($userId: String!) {
    UserLocAsgList(userId: $userId) {
      dateTime
      address
      name
    }
  }
`;
