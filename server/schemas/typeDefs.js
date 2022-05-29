const {gql} = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
  }

  type Book {
    _id: ID
    authors: [String]
    description: String
    bookId: ID
    image: String
    link: String
    title: String
  }

  type Query {
    me: User
  }
`

module.exports = typeDefs;