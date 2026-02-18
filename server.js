
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");

const app = express();
const db = new sqlite3.Database("./database.sqlite");

app.use(express.json());
app.use(express.static("public"));
app.set("trust proxy", true);

// DB 생성
db.serialize(async ()=>{

db.run(`CREATE TABLE IF NOT EXISTS reservations(
id INTEGER PRIMARY KEY AUTOINCREMENT,
date TEXT,
time TEXT,
name TEXT,
phone TEXT,
address TEXT,
memo TEXT,
status TEXT DEFAULT 'pending',
UNIQUE(date,time)
)`);

db.run(`CREATE TABLE IF NOT EXISTS admin(
id INTEGER PRIMARY KEY AUTOINCREMENT,
username TEXT UNIQUE,
password TEXT
)`);

db.get("SELECT * FROM admin WHERE username='admin'", async (err,row)=>{
if(!row){
const hash = await bcrypt.hash("admin",10);
db.run("INSERT INTO admin(username,password) VALUES(?,?)",["admin",hash]);
}
});

});

// 예약
app.post("/api/reserve",(req,res)=>{

const {date,time,name,phone,address,memo} = req.body;

db.run(`INSERT INTO reservations(date,time,name,phone,address,memo)
VALUES(?,?,?,?,?,?)`,
[date,time,name,phone,address,memo],
(err)=>{

if(err) return res.send({success:false,msg:"이미 예약됨"});

res.send({success:true});

});

});

// 예약조회
app.get("/api/reservations",(req,res)=>{

db.all("SELECT * FROM reservations",(err,rows)=>{

res.send(rows);

});

});

// 예약확정
app.post("/api/confirm/:id",(req,res)=>{

db.run("UPDATE reservations SET status='confirmed' WHERE id=?",
[req.params.id],
()=>res.send({success:true}));

});

// 관리자 로그인
app.post("/api/login",(req,res)=>{

const {username,password} = req.body;

db.get("SELECT * FROM admin WHERE username=?",
[username],
async(err,user)=>{

if(!user) return res.send({success:false});

const ok = await bcrypt.compare(password,user.password);

res.send({success:ok});

});

});

// 관리자 비밀번호 변경
app.post("/api/change-password",(req,res)=>{

bcrypt.hash(req.body.password,10,(err,hash)=>{

db.run("UPDATE admin SET password=? WHERE username='admin'",
[hash],
()=>res.send({success:true}));

});

});

app.listen(3000,()=>{
console.log("http://localhost:3000 실행됨");
});
