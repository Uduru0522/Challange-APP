const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose()
const SQLiteStore = require('connect-sqlite3')(session);
const crypto = require('crypto');
const person = require('./js/person.js')
let { PythonShell } = require('python-shell')

const app = express()
const port = 4114
var fs = require('fs');
var db = new sqlite3.Database("./database/users.db");


app.use(bodyParser.json({ limit: "1mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "1mb", extended: true }));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    rolling: true,
    store: new SQLiteStore({
        db: './database/users.db',
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
    },
}));

app.listen(process.env.PORT || port, () => {
    console.log(`listening on port: ${port}`);
});

app.use(express.static(`${__dirname}`));

app.get('/', (req, res) => {
    db.get("SELECT * FROM sessions WHERE sid = ?", req.sessionID, function(err, row) {
        if (row == undefined) {
            res.redirect('./html/login.html');
        } else if (req.session.uid == "admin") {
            res.redirect('./html/admin.html');
        } else {
            res.redirect('./html/index.html');
        }
    })
});

app.post('/html/login', (req, res) => {
    if (req.body.account != "" && req.body.password != "") {
        if (req.body.account == "uidd2021" && req.body.password == "ckmission") {
            req.session.uid = "admin";
            res.send("admin");
        } else {
            db.get("SELECT password FROM users WHERE account = ?", [req.body.account], function(err, row) {
                if (row == undefined) {
                    res.send("帳號不存在！");
                } else if (row.password == req.body.password) {
                    db.get("SELECT id FROM users WHERE account = ?", [req.body.account], function(err, row) {
                        req.session.uid = row.id;
                        res.send("jump");
                    })
                } else {
                    res.send("密碼錯誤！");
                }
            })
        }
    } else {
        res.send("帳號或密碼不能空白！");
    }
});

app.post('/html/register', (req, res) => {
    if (req.body.account != "" && req.body.password != "") {
        db.get("SELECT account FROM users WHERE account = ?", [req.body.account], function(err, row) {
            if (row == undefined) {
                db.serialize(function() {
                    db.run("CREATE TABLE IF NOT EXISTS users (account TEXT, password TEXT, email TEXT, lastname TEXT, firstname TEXT, id TEXT, name TEXT, title TEXT, intro TEXT, image BLOB, social INTEGER, travel INTEGER, food INTEGER, activity INTEGER, sport INTEGER, self INTEGER, total INTEFER)");

                    function check() {
                        var randomString = String.fromCharCode(Math.floor(Math.random() * 26) + "a".charCodeAt(0)) + String(Math.random()).slice(2, 9)
                        db.get("SELECT id FROM users WHERE id = ?", randomString, function(err, row) {
                            if (row != undefined) {
                                check();
                            } else {
                                db.run("INSERT INTO users (account, password, email, lastname, firstname, id, name, title, intro, image, social, travel, food, activity, sport, self, total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [req.body.account, req.body.password, req.body.email, req.body.lastname, req.body.firstname, randomString, req.body.lastname + req.body.firstname, "無", "無", "../resources/nav/mypage.png", 0, 0, 0, 0, 0, 0, 0]);
                                var db_mission = new sqlite3.Database("./database/mission.db");
                                db_mission.run(`CREATE TABLE IF NOT EXISTS ${randomString} (name text, multiple text, category text, description text, guide text, stage integer, now_stage integer DEFAULT(1), points integer, ID text, completed boolean DEFAULT(0), date time DATE DEFAULT (datetime('now','localtime')), category_no integer, picture text DEFAULT(';;'), pic_text text DEFAULT(';;')`);
                                db_mission.close();
                                var db_title = new sqlite3.Database("./database/title.db");
                                db_title.run(`CREATE TABLE IF NOT EXISTS ${randomString} (name text, category text, description text, points integer, ID integer, chosen boolean DEFAULT(0), category_no integer)`);
                                db_title.close();
                            }
                        });
                    }
                    check();
                });
                res.send("註冊成功！");
            } else {
                res.send("帳號已存在！");
            }
        })
    } else {
        res.send("帳號或密碼不能空白！");
    }
});

app.post('/html/mission/all_mission', (req, res) => {
    let options = {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "./python/",
        args: [
            0,
            req.session.uid
        ],
    };

    PythonShell.run("mission.py", options, function(err, data) {
        data = JSON.parse(data)
        res.send(data);
    });
});

app.post('/html/mission/maylike', (req, res) => {
    let options = {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "./python/",
        args: [
            1,
            req.session.uid
        ],
    };

    PythonShell.run("mission.py", options, function(err, data) {
        data = JSON.parse(data)
        res.send(data);
    });
});

app.post('/html/mission/popular', (req, res) => {
    let options = {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "./python/",
        args: [
            2,
            req.session.uid
        ],
    };

    PythonShell.run("mission.py", options, function(err, data) {
        data = JSON.parse(data)
        res.send(data);

    });
});

app.post('/html/mission/doing', (req, res) => {
    let options = {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "./python/",
        args: [
            3,
            req.session.uid
        ],
    };

    PythonShell.run("mission.py", options, function(err, data) {
        data = JSON.parse(data)
        res.send(data);
    });
});

app.post('/html/mission/done', (req, res) => {
    let options = {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "./python/",
        args: [
            4,
            req.session.uid
        ],
    };

    PythonShell.run("mission.py", options, function(err, data) {
        data = JSON.parse(data)
        res.send(data);
    });
});
app.post('/html/Fmission/done', (req, res) => {
    let options = {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "./python/",
        args: [
            4,
            req.body.friend_ID
        ],
    };

    PythonShell.run("mission.py", options, function(err, data) {
        data = JSON.parse(data)
        res.send(data);
    });
});

app.post('/html/mission/accept', (req, res) => {
    let options = {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "./python/",
        args: [
            5,
            req.session.uid,
            req.body.qid
        ],
    };

    PythonShell.run("mission.py", options, function(err, data) {
        res.send("Success");
    });
});

app.post('/html/mission/giveup', (req, res) => {
    let options = {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "./python/",
        args: [
            6,
            req.session.uid,
            req.body.qid
        ],
    };

    PythonShell.run("mission.py", options, function(err, data) {
        res.send("Success");
    });
});

app.post('/html/mission/report_single', (req, res) => {
    let options = {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "./python/",
        args: [
            7,
            req.session.uid,
            req.body.qid,
            req.body.img,
            req.body.text
        ],
    };

    PythonShell.run("mission.py", options, function(err, data) {
        res.send("Success");
    });
});

app.post('/html/mission/detail', (req, res) => {
    let options = {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "./python/",
        args: [
            8,
            req.session.uid,
            req.body.qid,
        ],
    };

    PythonShell.run("mission.py", options, function(err, data) {
        data = JSON.parse(data)
        res.send(data);
    });
});

app.post('/html/mission/samequest', (req, res) => {
    let options = {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "./python/",
        args: [
            9,
            req.body.qid,
        ],
    };

    PythonShell.run("mission.py", options, function(err, data) {
        data = JSON.parse(data)
        res.send(data);
    });
});

app.post('/html/mission/range', (req, res) => {
    let options = {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "./python/",
        args: [
            10,
            req.session.uid,
            req.body.lbound,
            req.body.hbound,
        ],
    };

    PythonShell.run("mission.py", options, function(err, data) {
        data = JSON.parse(data)
        res.send(data);
    });
});

app.post('/html/getphotos', (req, res) => {
    let options = {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "./python/",
        args: [
            11,
            req.session.uid,
        ],
    };

    PythonShell.run("mission.py", options, function(err, data) {
        data = JSON.parse(data)
        res.send(data);
    });
});

app.post('/html/getphotos_friend', (req, res) => {
    let options = {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "./python/",
        args: [
            11,
            req.body.friend_ID,
        ],
    };

    PythonShell.run("mission.py", options, function(err, data) {
        data = JSON.parse(data)
        res.send(data);
    });
});

app.post('/html/alltitle', (req, res) => {
    let options = {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "./python/",
        args: [
            12,
            req.session.uid,
        ],
    };

    PythonShell.run("mission.py", options, function(err, data) {
        data = JSON.parse(data)
        res.send(data);
    });
});

app.post('/html/choosetitle', (req, res) => {
    let options = {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "./python/",
        args: [
            13,
            req.session.uid,
            req.body.title_id
        ],
    };

    PythonShell.run("mission.py", options, function(err, data) {
        data = JSON.parse(data)
        res.send(data);
    });
});

app.post('/html/leaderboard', (req, res) => {
    let options = {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "./python/",
        args: [
            14,
            req.body.category
        ],
    };

    PythonShell.run("mission.py", options, function(err, data) {
        data = JSON.parse(data)
        res.send(data);
    });
});

app.post('/html/find_M_friend', (req, res) => {
    let options = {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "./python/",
        args: [
            15,
            req.session.uid,
            req.body.qid
        ],
    };

    PythonShell.run("mission.py", options, function(err, data) {
        data = JSON.parse(data)
        res.send(data);
    });
});

app.post('/html/addmission', (req, res) => {
    let options = {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "./python/",
        args: [
            16,
            req.session.uid,
            req.body.name,
            req.body.category,
            req.body.multiple,
            req.body.description,
            req.body.guide,
            req.body.difficulty
        ],
    };

    PythonShell.run("mission.py", options, function(err, data) {
        res.send("Success");
    });
});

app.post('/html/allstatus', (req, res) => {
    let options = {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "./python/",
        args: [
            17,
            req.session.uid
        ],
    };

    PythonShell.run("mission.py", options, function(err, data) {
        data = JSON.parse(data)
        res.send(data);
    });
});

app.post('/html/allstatus_others', (req, res) => {
    let options = {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "./python/",
        args: [
            17,
            req.body.uid
        ],
    };

    PythonShell.run("mission.py", options, function(err, data) {
        data = JSON.parse(data)
        res.send(data);
    });
});

app.post('/html/waiting', (req, res) => {
    let options = {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "./python/",
        args: [
            18
        ],
    };

    PythonShell.run("mission.py", options, function(err, data) {
        data = JSON.parse(data)
        res.send(data);
    });
});

app.post('/html/update', (req, res) => {
    let options = {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "./python/",
        args: [
            19,
            req.body.name,
            req.body.status,
            req.body.qid,
            req.body.point
        ],
    };

    PythonShell.run("mission.py", options, function(err, data) {
        res.send(`Successfully update ${req.body.name}`);
    });
});

app.post('/html/newest', (req, res) => {
    let options = {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "./python/",
        args: [
            20,
            req.session.uid
        ],
    };

    PythonShell.run("mission.py", options, function(err, data) {
        data = JSON.parse(data)
        res.send(data);
    });
});

app.post('/html/newgroup', (req, res) => {
    let options = {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "./python/",
        args: [
            "setupassi",
            req.body.output_mission,
            req.session.uid
        ],
    };

    PythonShell.run("chat.py", options, function(err, data) {
        res.send("Success");
    });
});

app.post('/html/sendmessage_friend', (req, res) => {
    let options = {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "./python/",
        args: [
            "talk",
            req.session.uid,
            req.body.friend_ID,
            req.body.your_message
        ],
    };

    PythonShell.run("chat.py", options, function(err, data) {
        data = JSON.parse(data);
        res.send(data);
    });
});

app.post('/html/sendmessage_mission', (req, res) => {
    let options = {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "./python/",
        args: [
            "assignmenttalk",
            req.body.chatroom_name,
            req.session.uid,
            req.body.your_message
        ],
    };

    PythonShell.run("chat.py", options, function(err, data) {
        data = JSON.parse(data);
        res.send(data);
    });
});

app.post('/html/chatrecord', (req, res) => {

    let options = {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "./python/",
        args: [
            "chatroomlist",
            req.session.uid,
        ],
    };

    PythonShell.run("chat.py", options, function(err, data) {
        data = JSON.parse(data)
        res.send(data);
    });
});

app.post('/html/friendrecord', (req, res) => {
    let options = {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "./python/",
        args: [
            "findfriend",
            req.session.uid,
        ],
    };

    PythonShell.run("friend.py", options, function(err, data) {
        data = JSON.parse(data)

        res.send(data);
    });
});

app.post('/html/addfriend', (req, res) => {
    let options = {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "./python/",
        args: [
            "addfriend",
            req.session.uid,
            req.body.person_ID
        ],
    };

    PythonShell.run("friend.py", options, function(err, data) {
        res.send("Success");
    });
});

app.post('/html/deletefriend', (req, res) => {
    let options = {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "./python/",
        args: [
            "delfriend",
            req.session.uid,
            req.body.person_ID
        ],
    };

    PythonShell.run("friend.py", options, function(err, data) {
        res.send("Success");
    });
});

app.post('/html/chatroom_friend', (req, res) => {
    let options = {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "./python/",
        args: [
            "talkfile",
            req.session.uid,
            req.body.friend_ID
        ],
    };

    PythonShell.run("chat.py", options, function(err, data) {
        data = JSON.parse(data)
        res.send(data);
    });
});

app.post('/html/chatroom_mission', (req, res) => {
    let options = {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "./python/",
        args: [
            "assignmentfile",
            req.body.chatroom_name,
            req.session.uid
        ],
    };

    PythonShell.run("chat.py", options, function(err, data) {
        data = JSON.parse(data)
        res.send(data);
    });
});

app.post('/html/singlefriend', (req, res) => {
    let options = {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "./python/",
        args: [
            "setuptalk",
            req.session.uid,
            req.body.friend_ID
        ],
    };

    PythonShell.run("chat.py", options, function(err, data) {
        res.send("Success");
    });
});

app.post('/html/assignmentadd', (req, res) => {
    let options = {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "./python/",
        args: [
            "assignmentadd",
            req.body.output_mission,
            req.session.uid,
            req.body.friend_ID
        ],
    };

    PythonShell.run("chat.py", options, function(err, data) {
        res.send("Success");
    });
});

app.post('/html/assignmentdel', (req, res) => {
    let options = {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "./python/",
        args: [
            "assignmentdel",
            req.body.chatroom_name,
            req.session.uid
        ],
    };

    PythonShell.run("chat.py", options, function(err, data) {
        res.send("Success");
    });
});

app.post('/html/findperson', (req, res) => {
    person.getInfo(req.body.person_ID, db).then(data => {
        res.send(data);
    })
});

app.post('/html/mypage-record', (req, res) => {
    person.getInfo(req.session.uid, db).then(data => {

        res.send(data);
    })
});
app.post('/html/friendpage-record', (req, res) => {
    person.getInfo(req.body.friend_ID, db).then(data => {

        res.send(data);
    })
});

app.post('/html/edit', (req, res) => {
    person.editInfo(req.session.uid, db, req.body.name, req.body.title, req.body.intro, req.body.image).then((data) => {
        res.send(data);
    })
});

app.post('/html/logout', (req, res) => {
    req.session.destroy();
    res.send('jump');
});