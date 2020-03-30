var express = require('express');
var router = express.Router();
const userHandler = require("../models/handleUsers");
const { body,validationResult,sanitizeBody,check } = require('express-validator');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* register. */
router.get('/register', async function(req, res, next) {    // display register route
  res.render('register', {                    // display register form view
      subtitle: 'Register User'     // input data to view
  });
});
router.post('/register',  [
  check('email', 'email is empty').isLength({ min: 1 }),
  check('password', 'password is to short').isLength({ min: 6}),
  ], function(req, res) {   // new user post route

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log("not there");
    return res.render('register', {                       // display register form view
      subtitle: 'Register User',     // input data to view
      wrong: 'email or password is to short'        // input data to view
    });
  }
  userHandler.upsertUser(req);
  console.log(req.body)
  return res.redirect('/'); // skip the receipt, return to fp
});

/* Login. */
router.get('/login', function(req, res) { //start login
  res.render('login', {
      subtitle: 'User Login'
  });
});
router.post('/login', [
  check('email').isLength({ min: 5 }),
  check('password').isLength({ min: 6}),
  ], async function(req, res) {// new user post route
  
  //Write something - navnet eller adgangskoden er for kort
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('login', {
      subtitle:  'User Login',
      wrong: 'email or password is to short'
    });
  }

  let rc = await userHandler.verifyUser(req); // brugeren er godkendt
  console.log(rc);
  console
  if (rc) {
    if (req.session.role === 'admin') {
      res.render('admin', { //admin is there
        subtitle: "The admin site",
        loggedin: true,
        who: "Hello " + req.session.user,
        link:  "/users/admin"
      });
    } else if (req.session.role === 'user') {
      res.render('user', { //user is there
        subtitle: "The user site",
        loggedin: true,
        who: "Hello " + req.session.user,
        link:  "/users/user"
      });
    } 
  } else { //user not there
      res.render('login', {
        subtitle: 'User Login',
          loggedin: false,
          wrong:  'email or password is incorrect' 
      });
  }
});
/* admin */
router.get('/admin', function(req, res) { //start login
  res.render('admin', { //admin is there
    subtitle: "The admin site",
    loggedin: true,
    who: "Hello " + req.session.user
  });
});
/* user */
router.get('/user', function(req, res) { //start login
  res.render('user', { //admin is there
    subtitle: "The user site",
    loggedin: true,
    who: "Hello " + req.session.user
  });
});






module.exports = router;
