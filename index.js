const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'jesuskid10758@@',
  database: 'suwegi'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

// 사용자 정보 저장 엔드포인트
app.post('/saveUserInfo', (req, res) => {
  const { user_id, access_token } = req.body;

  const query = 'INSERT INTO users (user_id, access_token) VALUES (?, ?)';
  db.query(query, [user_id, access_token], (err, result) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.status(200).send({ success: true, data: result });
    }
  });
});

// 서버 시작
app.listen(4000, () => {
  console.log('Server started on port 4000...');
});
