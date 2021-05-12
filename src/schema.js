const {gql} = require('apollo-server-express');

//기본 그래프 QL 애플리케이션 설정 
//GQL API 적용 - 스키마
module.exports = gql`
type Note {
  id: ID!
  content: String!
  author:String!
}
type Query {
  hello: String!
  notes: [Note!]!
  note(id: ID!): Note!
}

type Mutation {
  newNote(content: String!): Note!
}
`;
   