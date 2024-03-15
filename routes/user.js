var express = require('express');
var router = express.Router();
let conn = require("../dbConfig/connection")
const session = require("express-session")
const nodeMailer = require("nodemailer");

const sendEmail = (to, subject, text) => {
    console.log(to, subject, text);
    let mailer = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: "nodeexample2@gmail.com",
            pass: "nbchudbjgnbolivp"

        }
    })
    const options = {
        from: "nodemailsending@gmail.com",
        to: to,
        subject: subject,
        text: text
    }
    mailer.sendMail(options, (err) => {
        if (err)
            console.log(err)
        else
            console.log("sent");
    });
}



router.get("/userhome", function (req, res) {
    if (session.userssession != undefined)
        res.render("userhome");
    else {
        res.redirect("/userlogin");
    }
});
router.get("/", function (req, res) {
    if (session.userssession != undefined)
        res.render("userhome");
    else {
        res.redirect("/userlogin");
    }
});

//const session = require("express-session");
router.get("/userchangepassword", function (req, res) {
    console.log(session.userssession);
    if (session.userssession != undefined) {
        res.render('userchangepassword', {username: session.userssession});
    } else {
        res.redirect("/userlogin");
    }
    // console.log("abcd");
});
router.post("/userchangepasswordaction", (req, res) => {
    console.log(req.body)
    let {password, newpassword, confirmpassword} = req.body;
    let email = session.userssession;
    let selectdata = "select * from user where email='" + email + "' and password='" + password + "'";
    console.log(selectdata);
    conn.query(selectdata, (err, row) => {
        if (err) throw err;
        if (row.length > 0) {
            if (newpassword == confirmpassword) {
                let updatepass = "update user set password='" + newpassword + "' where email='" + email + "'";
                // console.log(updatepass)
                conn.query(updatepass, function (err) {
                    if (err) throw err;
                    sendEmail(email, "Password Updated", `Your password has been updated successfully`);
                    res.send("Password Updated successfully");
                })
            } else {
                res.send("New password and confirm password does not match");
            }
        } else {
            res.send("current password is not correct.");
        }
    })
});


router.get("/logout", function (req, res, next) {
    session.usersession = undefined;
    res.redirect("/userlogin");
});

router.get("/getcarmodel", (req, res) => {
    var Query = "select id,model from cars";
    conn.query(Query, (err, rows) => {
        if (err) throw err;
        if (rows.length > 0) {
            res.send(rows)
        }
    })
})
router.get("/get-user-details", (req, res) => {
    var email = session.userssession;
    console.log(email);
    var Query = "select * from user where email='" + email + "'";
    console.log(Query);
    conn.query(Query, (err, row) => {
        if (err) throw err;
        res.send(row);
    })
})
router.get("/get_price", (req, res) => {
    let {c} = req.query;
    let select = "select * from cars where id=" + c;
    conn.query(select, (err, row) => {
        if (err) throw err;
        res.send(row[0].rent);
    })
})
router.post("/book-form", (req, res) => {
    // console.log(req.body);
    let {
        fullname,
        phone,
        email,
        pick_up,
        drop_off,
        city,
        no_passenger,
        cartype,
        pick_date,
        pick_time,
        dage,
        carmodal,
        msg,
        price
    } = req.body;
    console.log(no_passenger);
    let checkQuery = `select * from booking where email='${session.userssession}' and pick_up_date='${pick_date}'`;
    console.log(checkQuery);
    conn.query(checkQuery, (err, row) => {
        if (err) throw err;
        if (row.length > 0) {
            res.send("exists");
        } else {
            let insertSQL = `insert into booking values(null,'${fullname}','${phone}','${email}','${pick_up}','${drop_off}',
${no_passenger},'${cartype}','${pick_date}','${pick_time}',${dage},'${carmodal}','${msg}',${city},${price},'online','paid', null)`;
            console.log(insertSQL);
            conn.query(insertSQL, (err) => {
                if (err) throw err;
                res.send("booked");
            })
        }
    })
})

router.get("/thank-you",(req,res)=>{
    if (session.userssession != undefined)
        res.render("thank-you");
    else {
        res.redirect("/userlogin");
    }
})
router.get("/my-bookings",(req,res)=>{
    if (session.userssession != undefined)
        res.render("user-bookings");
    else
        res.redirect("/userlogin")
})

router.get("/user-booking", (req, res) => {
    var Query = "select * from booking where email='"+session.userssession+"'";
    console.log(Query);
    conn.query(Query, (err, rows) => {
        if (err) throw err;
        if (rows.length > 0)
            res.send(rows);
        else
            res.send("zero")
    })
})

module.exports = router;
