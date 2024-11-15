import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    username: String
  }

  type Query {
    currentUser: User
  }

  type Mutation {
    signUp(username: String!, password: String!): Boolean
    signIn(username: String!, password: String!): Boolean
    signOut: Boolean
  }
`;

export default typeDefs;
