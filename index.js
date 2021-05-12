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
        } else {
            res.redirect('./html/index.html');
        }
    })
});

app.post('/html/login', (req, res) => {
    if (req.body.account != "" && req.body.password != "") {
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
    } else {
        res.send("帳號或密碼不能空白！");
    }
});

// app.post('/html/register', (req, res) => {
//     if (req.body.account != "" && req.body.password != ""){
//         db.get("SELECT account FROM users WHERE account = ?", [req.body.account], function(err, row) {
//             if(row == undefined){
//                 db.serialize(function() {
//                     db.run("CREATE TABLE IF NOT EXISTS users (account TEXT, password TEXT, id TEXT, name TEXT, title TEXT, intro TEXT, image BLOB, social INTEGER, travel INTEGER, food INTEGER, activity INTEGER, sport INTEGER, self INTEGER)");
//                     function check(){
//                         var randomString = crypto.randomBytes(32).toString('hex').substr(0, 8);
//                         db.get("SELECT id FROM users WHERE id = ?", randomString, function(err, row) {
//                             if(row != undefined){
//                                 check();
//                             }
//                             else{
//                                 db.run("INSERT INTO users (account, password, id) VALUES (?, ?, ?)", [req.body.account, req.body.password, randomString]);
//                             }
//                         });
//                     }
//                     check();
//                 });
//                 res.send("Rigister successfully!");
//             }
//             else{
//                 res.send("Account has existed!");
//             }
//         })
//     }
//     else{
//         res.send("Account or Password cannot be empty!");
//     }
// });

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

app.post('/html/newgroup', (req, res) => {
    let options = {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "./python/",
        args: [
            "setupassi",
            req.body.output_mission,
            req.session.uid,
            req.body.output_friend
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
            req.body.mission_name,
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

// app.post('/html/edit', (req, res) => {
//     person.editInfo(req.session.uid, db, req.body.name, req.body.title, req.body.intro, req.body.image).then((data) => {
//         res.send(data);
//     })
// });

// app.post('/logout', (req, res) => {
//     req.session.destroy();
//     res.redirect('login.html');
// });