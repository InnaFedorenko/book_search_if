import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
query Users {
  me {
    _id
    bookCount
    email
    password
    username
  }
}
`;

export const QUERY_USER = gql`
query User($username: String!) {
  user(username: $username) {
    _id
    bookCount
    email
    password
    username
  }
}
`;

// export const QUERY_ME = gql`
// query Me {
//   me {
//     _id
//     bookCount
//     email
//     password
//     username
//   }
// }
// `;
