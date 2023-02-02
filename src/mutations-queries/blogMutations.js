import { gql } from "@apollo/client";
export const GET_BLOGS = gql`
  {
    blogs {
      id
      title
      caption
      date
      comments {
        text
        user {
          name
        }
      }
      user {
        name
        email
      }
    }
  }
`;

export const GET_BLOG_BY_ID = gql`
  query blog($id: ID!) {
    blog(id: $id) {
      title
      id
      caption
      date
      user {
        name
        email
      }
      comments {
        text
        user {
          name
        }
      }
    }
  }
`;

export const SEND_COMMENT = gql`
  mutation addCommentToBlog(
    $blogId: ID!
    $text: String!
    $user: ID!
    $date: String!
  ) {
    addCommentToBlog(blogId: $blogId, text: $text, user: $user, date: $date) {
      text
      user {
        name
      }
    }
  }
`;

export const USER_SIGNUP = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      name
      email
      id
    }
  }
`;
export const USER_LOGIN = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      name
      email
    }
  }
`;
