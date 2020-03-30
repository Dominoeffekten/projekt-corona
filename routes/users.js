var express = require('express');
var router = express.Router();
const userHandler = require("../models/handleUsers");
const ToDoHandler = require("../models/handleToDo");
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
  ], async function(req, res, next) {// new user post route
  
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
        scriptLink:'/javascripts/admin.js',
        loggedin: true,
        who: "Hello " + req.session.user,
        link:  "/users/admin",
      });
    } else if (req.session.role === 'user') {
      res.render('user', { //user is there
        scriptLink:'/javascripts/user.js',
        subtitle: "The user site",
        loggedin: true,
        who: "Hello " + req.session.user,
        link:  "/users/user",
        read: req.session.user
      });
    } else if (req.session.role === 'new') {
      res.render('index', { //user is there
        subtitle: "You must be autozhied by a admin",
        loggedin: false,
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
router.get('/admin',  async function(req, res) { //start login
  res.render('admin', { //admin is there
    subtitle: "The admin site",
    loggedin: true,
    who: "Hello " + req.session.user
  });
});
router.get('/admin/:user',  async function(req, res) { //start login
  let user = await userHandler.getUsers({role: "new"}, {sort: {role: 1}});
  res.json(user);
});
router.post('/admin/:user',  async function(req, res) { //start login
  let user = await userHandler.upsertUser({}, {sort: {role: 1}});
  res.json(user);
});

/* user */
router.get('/user',  async function(req, res) { //start user
  res.render('user', { 
    subtitle: "The user site",
    scriptLink:'/javascripts/user.js',
    loggedin: true,
    who: "Hello " + req.session.user,
  });
});
router.get('/user/:todo',  async function(req, res) { //show todo
  let todo = await ToDoHandler.getToDo({}, {sort: {title: 1}});
  res.json(todo)
});

router.post('/user/:todo',[
  check('title').isLength({ min: 1 }),
  ],  async function(req, res) { //indsætter en todo liste
  const errors = validationResult(req) //Write something - title er forkort
  if (!errors.isEmpty()) {
    return res.render('user', {
      subtitle: "The user site",
      wrong: 'Title is to short'
    });
  }
  let to = ToDoHandler.upsertToDo(req);
  console.log(to);
});
router.post('/user',  async function(req, res) { //fjerner en todo
  console.log(req.body);
  let todo = await ToDoHandler.delToDo({title: req.body.title}, {sort: {title: 1}});
  res.render('user', { 
    subtitle: "The user site",
    scriptLink:'/javascripts/user.js',
    loggedin: true,
    who: "Hello " + req.session.user,
  });
});






module.exports = router;
