//몽구스 라이브러리 요청
const mongoose = require('mongoose');

module.exports = {
    connect: DB_HOST => {
        //몽고 드라이버의 업데이터된 URL 스프링 파서 사용
        mongoose.set('useNewUrlParser', true);

        //findAndModify() 대신 findOndAndUpdate() 사용
        mongoose.set('useFindAndModify', false);

        //ensureIndex() 대신 createIndex() 사용
        mongoose.set('useCreateIndex', true);

        //새로운 서버 디스커버리 및 모니터링 엔진 사용
        mongoose.set('useUnifiedTopology', true);

        //DB에 연결
        mongoose.connect(DB_HOST);

        //연결 실패시 에러 로깅
        mongoose.connection.on('error', err => {
            console.error(err);
            console.log(
                'MongoDB connection error. MongoDB가 작동 중인지 확인해주세요.'
            );
            process.exit();
        })
    },
    close: () => {
        mongoose.connection.close();
    }
};