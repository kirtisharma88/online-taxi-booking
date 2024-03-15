var express = require('express');
var router = express.Router();
const session = require('express-session');
let conn = require("../dbConfig/connection")



/* GET home page. */
router.get('/', function (req, res, next) {
    let sql = "SELECT * FROM admins";
    conn.query(sql, (e, rows) => {
        console.log(rows);
        // console.log(rows.length);
    })
    res.render('index', {title: 'Express'});
});

router.get("/login", (req, res) => {
    res.render("login");
});
router.post('/loginaction', function (req, res) {
    let {username, pass} = req.body;
    // console.log(req.body);
    let selectSQL = "select * from admin where username='" + username + "' and password='" + pass + "'";
    console.log(selectSQL);
    conn.query(selectSQL, (err, row) => {
        // if (err) throw err;
        if (err) {
            console.log(err.message);
        } else if (row.length > 0) {
            session.adminsession = username;
            // console.log(session.adminsession);
            res.send("success");
        } else {
            res.send("no data found");
        }
    })
});

router.get('/', function (req, res, next) {
    let sql = "SELECT * FROM drivers";
    conn.query(sql, (e, rows) => {
        console.log(rows);
        // console.log(rows.length);
    })
    res.render('index', {title: 'Express'});
});

router.get("/driverslogin", (req, res) => {
    res.render("driverslogin");
});
router.post('/driversloginaction', function (req, res) {
    let {email, pass} = req.body;
    // console.log(req.body);
    let select = "select * from drivers where email='" + email + "' and password='" + pass + "'";
    console.log(select);
    conn.query(select, (err, row) => {
        if (err) throw err;
        if (row.length > 0) {
            session.driverssession = email;
            console.log(session.driverssession);
            res.send("success");
        } else {
            res.send("no data found");
        }
    })
});

router.get('/', function (req, res, next) {
    let sql = "SELECT * FROM user";
    conn.query(sql, (e, rows) => {
        console.log(rows);
        // console.log(rows.length);
    })
    res.render('index', {title: 'Express'});
});

router.get("/userlogin", (req, res) => {
    res.render("userlogin");
});
router.post('/userloginaction', function (req, res) {
     console.log(req.body);
    let {email, pass} = req.body;
    let select = "select * from user where email='" + email + "' and password='" + pass + "'";
    // console.log(select);
    conn.query(select, (err, row) => {
        if (err) throw err;
        if (row.length > 0) {
            session.userssession = email;
            // console.log(session.userssession);
            res.send("success");
        } else {
            res.send("no data found");
        }
    })
});

router.get("/contact", (req, res) => {
    res.render("contact");
});

router.get("/about", (req, res) => {
    res.render("about");
});

router.get("/blog", (req, res) => {
    res.render("blog");
});
router.get("/book-ride", (req, res) => {
    res.render("book-ride");
});
router.get("/blog-details", (req, res) => {
    res.render("blog-details");
});
router.get("/driver", (req, res) => {
    res.render("driver");
});
router.get("/taxi", (req, res) => {
    res.render("taxi");
});

router.get("/single-taxi", (req, res) => {
    res.render("single-taxi");
});

router.get("/adduser", (req, res) => {
    res.render("adduser");
});

router.post("/adduseraction", (req, res) => {
    // console.log(req.query);
    let{fullname, email, pass,phone} = req.body;
    let select="select * from user where email='"+email+"'";
    conn.query(select,(err,row)=>{
        if(err) throw err;
        if(row.length >0){
            res.send("exists");
        }
        else{
            let Query = `insert into user values('${pass}','${fullname}','${phone}','${email}','active')`;
            // console.log(Query);
            conn.query(Query, (err) => {
                if (err) throw err;
                res.send('inserted');
            })
        }
    })


})

module.exports = router;
