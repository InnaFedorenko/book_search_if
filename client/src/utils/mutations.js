import { gql } from '@apollo/client';


export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password){
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER_MUTATION = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password){
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK_MUTATION = gql`
  mutation saveBook($authors: [String], $description: String!, $title: String!, $bookId: String!, $image: String, $link: String) {
    saveBook(authors: $authors, description: $description, title: $title, bookId: $bookId, image: $image, link: $link){
      _id
      username
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;


export const REMOVE_BOOK_MUTATION = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId){
      _id
      username
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;