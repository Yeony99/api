//스키마 파일 저장하기 위해

//몽구스 라이브러리 요청
const mongoose = require('mongoose');

//노트의 DB 스키마 정의
const noteSchma = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        }
    },
    {
        //Date 자료형으로 CreateAt, updatedAt 필드 할당
        timestamps: true
    }
);

//스키마와 함께 'Note' 모델 정의
const Note = mongoose.model('Note', noteSchma);

//모듈 내보내기
module.exports = Note;

