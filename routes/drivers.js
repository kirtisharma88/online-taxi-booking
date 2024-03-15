var express = require('express');
var router = express.Router();
let conn = require("../dbConfig/connection")
const session = require("express-session")
const nodeMailer = require("nodemailer");
const {log} = require("debug");

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



router.get("/drivershome", function (req, res) {
    if (session.driverssession != undefined)
        res.render("drivershome");
    else
        res.redirect("/driverslogin")
});

// const session = require("express-session");
router.get("/driverschangepassword", function (req, res) {

    console.log(session.driverssession);
    if (session.driverssession != undefined) {
        res.render('driverschangepassword', {username: session.driverssession});
    } else {
        res.redirect("/driverslogin");
    }
    // console.log("abcd");
});
router.post("/driverschangepasswordaction", (req, res) => {
    console.log(req.body)
    let {password, newpassword, confirmpassword} = req.body;
    let email = session.driverssession;
    let selectdata = "select * from drivers where email='" + email + "' and password='" + password + "'";
    console.log(selectdata);
    conn.query(selectdata, (err, row) => {
        if (err) throw err;
        if (row.length > 0) {
            if (newpassword == confirmpassword) {
                let updatepass = "update drivers set password='" + newpassword + "' where email='" + email + "'";
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
})

router.get("/logout", function (req, res, next) {
    session.adminsession = undefined;
    res.redirect("/driverslogin");
});

router.get("/today_booking", (req, res) => {
    var dt = new Date();
    var tdate = dt.getDate();
    var tmonth = dt.getMonth() + 1;
    if (tmonth < 9) {
        tmonth = "0" + tmonth;
    }
    var tyear = dt.getFullYear();
    console.log(tdate + " " + tmonth + " " + tyear);
    var today_date = tyear + "-" + tmonth + "-" + tdate;
    var Query = "select * from booking where pick_up_date='" + today_date + "' and status='assigned' and driver='"+session.driverssession+"'";
    console.log(Query);
    conn.query(Query, (err, rows) => {
        if (err) throw err;
        if (rows.length > 0)
            res.send(rows);
        else
            res.send("zero")
    })
})

router.get("/status-completed",(req,res)=>{
    let {b} = req.query;
    let update =`update booking set status='completed' where book_id = ${b}`;
    conn.query(update,(err)=>{
        if(err) throw err;
        res.send("updated");
    })
})
router.get("/my-bookings",(req,res)=>{
    if (session.driverssession != undefined)
        res.render("driver-bookings");
    else
        res.redirect("/driverslogin")
})
router.get("/driver-booking", (req, res) => {
    var Query = "select * from booking where driver='"+session.driverssession+"'";
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
