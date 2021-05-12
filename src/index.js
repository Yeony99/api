// index.js
// This is the main entry point of our application

const express = require('express');
//get apollo-server
const { ApolloServer} = require('apollo-server-express');
require('dotenv').config();


//로컬 모듈 import
//import foreign schema
const typeDefs = require('./schema');
//import resolvers
const resolvers = require('./resolvers');
const db = require('./db');
const models = require('./models'); //models/index.js에서부터 모델을 가져올 수 있음. 데이터베이스 모델을 아폴로 서버 익스프레스 애플리케이션 코드에 통합 가능.

// .env 파일에 명시된 포트 or 4000에서 실행
const port = process.env.PORT || 4000; //명시적으로 포트번호 지정하지 않으면 예비 포트 4000번이 지정.
const DB_HOST = process.env.DB_HOST;


const app = express();

//DB 연결
db.connect(DB_HOST);

//아폴로 서버 설정
//const server = new ApolloServer({ typeDefs, resolvers });
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    //context에 db models 추가
    return {models};
  }
});

// 아폴로 그래프 QL 미들웨어를 적용하고 경로를 /api로 설정
server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () =>
console.log(
  `GraphQL server running at http://localhost:${port}${server.graphqlPath}`
  )
);

