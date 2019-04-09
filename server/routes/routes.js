let express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/user', async (req, res) => {
    try {
        let email = req.query.email;
        let user = await Employee.findOne({email: email}, "-_id -__v").exec();
        res.json({user: user});
    } catch (e) {
        console.log(e);
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie("user");
    res.send();
});

router.get('/login', (req, res) => {
   let email = req.query.email;
    Employee.findOne({email: email}).exec((err, user) => {
       if(!user) {
           // console.log("register new user");
           res.json({login_status: false});
       } else {
           res.cookie('user', user.email);
           res.json({login_status: true, user: user});
       }
    });
});

router.post('/signup', (req, res) => {
    let user = req.body;

    Employee.create(user, (err, employee) => {
        if(err) {
            console.log(err);
        } else {
            res.cookie('user', employee.email);
            res.json({login_status: true, user: user});
        }
    });
});

router.post('/update', (req, res) => {
    let user = req.body;
    // console.log(user);
    Employee.findOneAndUpdate({email: user.email}, user, {new: true}).exec((err, usr) => {
       if(usr) {
           res.status(200).json(user);
       }
    });
});

router.get('/employees', (req, res) => {
    Employee.find({email: {$ne: req.cookies.user}}, "-_id -__v").exec((err, list) => {
        if(err) {
            console.log(err);
        } else {
            res.json(list);
        }
    })
});

module.exports = router;