var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const session = require("express-session");
const nodeMailer = require("nodemailer");
let conn = require('../dbConfig/connection');
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
        from: "nodeexample2@gmail.com",
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


let checkAdmin = (req, res, next) => {
    if (session.adminsession !== undefined) {
        next();
    } else {
        res.redirect("/login")

    }
}

/* GET users listing. */
router.get('/', checkAdmin, function (req, res, next) {
    res.render('adminhome');
});

router.get("/add-admin", checkAdmin, (req, res) => {
    res.render("add_admin");
});

router.post('/add-adminaction', function (req, res, next) {
    console.log(req.body);
    let {username, password, cpass, fname, phone, email, admin} = req.body;
    let insert = `Insert Into admin values('${username}', '${password}', '${fname}', '${phone}', '${email}', '${admin}','active')`;
    // console.log(insert);
    conn.query(insert, (err) => {
        if (err) {
            res.send(err.message);
        } else {
            res.send("success");
        }
    })
});

router.get("/fetch-admin",(req,res)=>{
    let selectSQL = "select * from admin";
    conn.query(selectSQL,(err,rows)=>{
        if(err)
            res.send(err.message);
        res.send(rows);
    })
})

router.get("/taxitype", checkAdmin, function (req, res) {
    res.render("taxitype");
});


router.post('/taxitypeaction', function (req, res, next) {
    // console.log(req.body);
    let {taxitype} = req.body;

    let insert = `Insert Into taxitype(type) values('${taxitype}')`;
    // console.log(insert);
    conn.query(insert, (err) => {
        if (err) {
            res.send(err.message);
        } else {
            res.send("success");
        }
    })
});


router.get("/gettaxitypedata", function (req, res) {
    let select = "select * from taxitype";
    conn.query(select, function (err, rows) {
        if (err) throw err;
        if (rows.length > 0) {
            console.log(rows);
            res.send(rows);
        } else {
            res.send("no data found");
        }
    })
});

router.get("/viewtaxitype", checkAdmin, function (req, res) {
    res.render("viewtaxitype");
});

router.get("/adminhome", function (req, res) {
    res.render("adminhome");

});

router.post("/add_adminaction",(req,res)=>{
    console.log(req.body);
    let {username,password,cpass,fname,phone,email,admin} = req.body;
    let selectSQL = `select * from admin where username='${username}'`;
    conn.query(selectSQL,(err,row)=>{
        if(err)
            res.send(err.message);
        if(row.length > 0){
            res.send("exists");
        }
        else{
            let insertSQL =`insert into admin values('${username}','${password}','${fname}','${phone}','${email}','${admin}','Active')`;
            console.log(insertSQL);
            conn.query(insertSQL,(err)=>{
                if(err)
                    res.send(err.message)
                res.send("inserted")
            })
        }
    })
})

router.get("/driversaction", (req, res) => {
    // console.log(req.query);
    var driver = req.query.driver;
    var phone = req.query.phone;
    var username = req.query.username;
    var email = req.query.email;
    var password = req.query.password;

    let select = "select * from drivers where email='" + email + "'";
    conn.query(select, (err, row) => {
        if (err) throw err;
        // console.log(row);

        if (row.length > 0) {
            res.send("exist");
        } else {
            let Query = "insert into drivers values('" + driver + "','" + phone + "' ,'" + username + "','" + email + "', '" + password + "')";
            conn.query(Query, (err) => {
                if (err) throw err;
                sendEmail(email, "Driver Added", `Driver added successfully. your email is ${email} and password is ${password}`);
                res.send('inserted');
            });
        }
    });
});

router.get("/viewdrivers", checkAdmin, function (req, res) {
    /* if (session.adminsession != undefined)*/
    res.render('viewdrivers');

    /* else {
         res.redirect('/login');
     }*/
})
router.get('/viewdriversaction', function (req, res) {
    let select = "select * from drivers ";
    conn.query(select, function (err, rows) {
        if (err) throw err;
        if (rows.length > 0) {
            // console.log(rows);
            res.send(rows);
        } else {
            res.send("no data found");
        }
    })
})

router.get("/addcars", checkAdmin, function (req, res) {
    /* if (session.adminsession != undefined)*/
    res.render('addcars');

    /* else {
         res.redirect('/login');
     }*/
})

router.post('/carsaction', function (req, res) {
    console.log(req.body);
    let {type,carname,brand,model,color,description,regno,insurance,rent} = req.body;
    let img = req.files.photo;
    let path = "public/images/" + img.name;
    let pathDB = "/images/" + img.name;
    img.mv(path, function (err) {
        if (err) throw err;
        let Query = "insert into cars values(null, '" + carname + "','" + brand + " ' ,'" + model + " ','" + color + "','" + description + "','" + pathDB + "','" + regno + "','" + insurance + "','" + rent + "', 'Active','" + type + " ' )";
        conn.query(Query, (err) => {
            if (err) throw err;
            res.send('inserted');
        })
    })
});

router.get('/addcarsaction', function (req, res) {
    let select = "select * from cars";
    conn.query(select, function (err, rows) {
        if (err) throw err;
        if (rows.length > 0) {
            // console.log(rows);
            res.send(rows);
        } else {
            res.send("no data found");
        }
    })
});

router.get('/getTaxiType', function (req, res) {
    let select = "select * from taxitype";
    conn.query(select, function (err, rows) {
        if (err) throw err;
        if (rows.length > 0) {
            // console.log(rows);
            res.send(rows);
        } else {
            res.send("no data found");
        }
    })
})

router.get("/del-TaxiType/:ty",(req,res)=>{
    let {ty} = req.params;
    let delSQL ="delete from taxitype where type='"+ty+"'";
    conn.query(delSQL,(err)=>{
        if(err)
            res.send(err.message);
        res.send("deleted");
    })
})

router.get("/adminchangepassword", checkAdmin, function (req, res) {
    res.render('adminchangepassword', {username: session.adminsession});
});

router.post("/adminchangepasswordaction", (req, res) => {
    // console.log(req.body)
    let {password, newpassword, confirmpassword} = req.body;
    let username = session.adminsession;
    let selectdata = "select * from admin where username='" + username + "' and password='" + password + "'";
    // console.log(selectdata);
    conn.query(selectdata, (err, row) => {
        if (err) throw err;
        if (row.length > 0) {
            if (newpassword == confirmpassword) {
                let updatepass = "update admin set password='" + newpassword + "' where username='" + username + "'";
                // console.log(updatepass)
                conn.query(updatepass, function (err) {
                    if (err) throw err;
                    res.send("updated");
                })
            } else {
                res.send("newpassword and confirmpassword does not match");
            }
        } else {
            res.send("current password is not correct.");
        }
    })
})


router.get("/logout", checkAdmin, function (req, res, next) {
    session.adminsession = undefined;
    res.redirect("/login");
});


router.get("/city", checkAdmin, function (req, res) {
    // if (session.usersession != undefined) {
    res.render("city");
    // } else {
    //     res.redirect("/login");
    // }

})


router.post("/cityaction", (req, res) => {
    /*console.log(req.query);*/
    var cityname = req.body.cityname;
    var photo = req.body.photo;


    let img = req.files.photo;
    let path = "public/images/" + img.name;
    let pathDB = "/images/" + img.name;

    img.mv(path, function (err) {
        if (err) throw err;
    })

    let Query = "insert into city (cityname,cityphoto) values('" + cityname + "', '" + pathDB + "')";
    /*console.log(Query);*/
    conn.query(Query, (err) => {
        if (err) throw err;


        res.send('inserted');
    })


})


router.get("/viewcity", function (req, res) {
    let select = "select * from city";
    conn.query(select, function (err, rows) {
        if (err) throw err;
        if (rows.length > 0) {
            console.log(rows);
            res.send(rows);
        } else {
            res.send("no data found");
        }

    })
})

router.get("/area", checkAdmin, function (req, res) {
    res.render("area");
})


router.get("/viewcities", function (req, res) {
    let select = "select * from city";
    conn.query(select, function (err, rows) {
        if (err) throw err;
        if (rows.length > 0) {
            console.log(rows);
            res.send(rows);
        } else {
            res.send("no data found");
        }
    })
})

router.post("/areaaction", (req, res) => {
    // console.log(req.body);
    var areaname = req.body.areaname;
    var cityname = req.body.cityname;

    let img = req.files.photo;
    let path = "public/images/" + img.name;
    let pathDB = "/images/" + img.name;

    img.mv(path, function (err) {
        if (err) throw err;
    })

    let Query = "insert into area values(null, '" + areaname + "', '" + pathDB + "', '" + cityname + "')";
    /*console.log(Query);*/
    conn.query(Query, (err) => {
        if (err) throw err;
        res.send('inserted');
    })
})
router.get("/viewarea", function (req, res) {
    let select = "SELECT area.*, city.cityname FROM area inner join city on area.cityid=city.cityid";
    conn.query(select, function (err, rows) {
        if (err) throw err;
        if (rows.length > 0) {
            // console.log(rows);
            res.send(rows);
        } else {
            res.send("no data found");
        }

    })
})
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
    var Query = "select * from booking where pick_up_date='" + today_date + "' and status='paid'";
    console.log(Query);
    conn.query(Query, (err, rows) => {
        if (err) throw err;
        if (rows.length > 0)
            res.send(rows);
        else
            res.send("zero")
    })
})
router.get("/getdrivers", (req, res) => {
    var Select = "select * from drivers";
    conn.query(Select, (err, rows) => {
        if (err) throw err;
        if (rows.length > 0) {
            res.send(rows);
        } else {
            res.send("zero");
        }
    })
})
router.get("/update-booking", (req, res) => {
    let {id, d} = req.query;
    let update = `update booking set driver = '${d}',status='assigned' where book_id=${id}`;
    conn.query(update, (err) => {
        if (err) throw err;
        res.send("updated");
    })
})
router.get("/admin-bookings", (req, res) => {
    res.render("admin-bookings");
})
router.get("/get-car-booking", (req, res) => {
    var Query = "select * from booking where status != 'paid'";
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
