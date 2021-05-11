// index.js
// This is the main entry point of our application

const express = require('express');
//get apollo-server
const { ApolloServer, gql } = require('apollo-server-express');
require('dotenv').config();

const db = require('./db');
const models = require('./models'); //models/index.js에서부터 모델을 가져올 수 있음. 데이터베이스 모델을 아폴로 서버 익스프레스 애플리케이션 코드에 통합 가능.


const port = process.env.PORT || 4000; //명시적으로 포트번호 지정하지 않으면 예비 포트 4000번이 지정.
const DB_HOST = process.env.DB_HOST;

//API에서 제공하는 기본 데이터로 사용할 배열 - id, content, author
/*
let notes = [
  {id: '1', content: 'This is a note', author:'Yeony Kim'},
  {id: '2', content: 'This is another note', author: 'Nayeon Kim'},
  {id: '3', content: 'another note again!', author: 'yeony99'}
];
*/


//리졸버 함수
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    notes: async () => {
      return await models.Note.find();
    },
      
    note: async (parent, args) => {
      return await models.Note.findById(args.id);
      }
    },
    Mutation: {
      newNote: async (parent, args) => {
        return await models.Note.create({
          content: args.content,
          author: 'yeony'
        });
      }
    }
};


const app = express();

//DB 연결
db.connect(DB_HOST);

//아폴로 서버 설정
const server = new ApolloServer({ typeDefs, resolvers });

// 아폴로 그래프 QL 미들웨어를 적용하고 경로를 /api로 설정
server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () =>
console.log(
  `GraphQL server running at http://localhost:${port}${server.graphqlPath}`
  )
);

