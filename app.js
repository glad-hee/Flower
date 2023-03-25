const { response } = require("express");
const express = require("express");
const app = express();
const PORT = 5656;
// static & views 설정
app.set("view engine", "ejs");
app.set("/views", "views");
app.use("/static", express.static(__dirname + "/static"));
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/index/page2", (request, response) => {
  response.render("page2");
});

app.get("/index", (require, response) => {
  response.render("index");
});

/* 나중에 라우팅될 코드 get 요청 이용해서 작성 */
// 포트 열기
app.listen(PORT, () => {
  console.log(PORT + "is open!");
  console.log(`http://localhost:${PORT}`);
});
