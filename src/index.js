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
  context: ({req}) => {
    //헤더에서 사용자 토큰 가져오기
    const token = req.headers.authorization;
    //토큰에서 사용자 얻기
    const user = getUser(token);

    //콘솔에 user 로깅
    console.log(user);

    //context에 db models 추가, user 추가
    return {models, user};
  }
});

// 아폴로 그래프 QL 미들웨어를 적용하고 경로를 /api로 설정
server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () =>
console.log(
  `GraphQL server running at http://localhost:${port}${server.graphqlPath}`
  )
);

const jwt = require('jsonwebtoken');

//JWT에서 사용자 정보 가져오기
const getUser = token => {
  if(token) {
    try {
      //토큰에서 얻은 사용자 정보 반환
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      //토큰에 문제 있으면 에러 던지기
      throw new Error('Session invalid');
    }
  }
};

