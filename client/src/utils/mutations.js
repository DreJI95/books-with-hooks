import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($authors: [String], 
    $description: String!,
    $title: String!,
    $bookId: String!,
    $image: String,
    $link: String) {
    saveBook(authors: $authors, 
        description: $description,
        title: $title, 
        bookId: $bookId,
        image: $image, 
        link: $link) {
      token
      user {
        _id
        username
        savedBooks
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($authors: [String], 
    $description: String!,
    $title: String!,
    $bookId: String!,
    $image: String,
    $link: String) {
    removeBook(authors: $authors, 
        description: $description,
        title: $title, 
        bookId: $bookId,
        image: $image, 
        link: $link) {
      token
      user {
        _id
        username
        savedBooks
      }
    }
  }
`;
