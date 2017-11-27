var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data');

var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) {

});

var userModel = mongoose.Schema({
  username: String,
  password: String,
  user_level: String,
  email: String,
  age: String,
  answer1: String,
  answer2: String,
  answer3: String
});

var User = mongoose.model('Users_Collection', userModel);

exports.index = function (req, res) {
  res.render('index', {
  });
};

exports.login = function (req, res) {
  res.render('login', {
    title: 'Login'
  });
};

exports.loginUser = function (req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  User.findOne({'username': user.username, 'password': user.password}, function (err, res) {
    if(err) return console.error(err);
    req.session.isLoggedIn = "true";
    req.session.isAdmin = User.userLevel;
    redirect("/home");
  });
};

exports.home = function (req, res) {
  res.render('home', {
    title: 'Home'
  });
};

exports.logout = function (req, res) {
  req.session.destroy();
  res.redirect("/");
};

exports.create = function (req, res) {
  res.render('create', {
    title: 'Create Account'
  });
};

exports.createUser = function (req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password,
    userLevel: req.body.user_level,
    email: req.body.email,
    age: req.body.age,
    answer1: req.body.answer_1,
    answer2: req.body.answer_2,
    answer3: req.body.answer_3
  });
  user.save(function (err, user) {
    if (err) return console.error(err);
    console.log(req.body.username + ' added');
  });
  res.redirect('/home');

  req.session.isLoggedIn = "true";
  req.session.isAdmin = user.userLevel;
};

exports.edit = function (req, res) {
  if (req.session.isLoggedIn == "true") {
    User.findById(req.params.id, function (err, user) {
      if (err) return console.error(err);
      res.render('edit', {
        title: 'Edit User',
        user: user
      });
    });
  }
  else {
    res.render('login', {
      title: 'Login'
    });
  }
};

exports.editUser = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) return console.error(err);
    user.username = req.body.username;
    user.password = req.body.password;
    user.userLevel = req.body.user_level;
    user.email = req.body.email;
    user.age = req.body.age;
    user.answer1 = req.body.answer_1;
    user.answer2 = req.body.answer_2;
    user.answer3 = req.body.answer_3;
    user.save(function (err, user) {
      if (err) return console.error(err);
      console.log(req.body.username + ' updated');
    });
  });
  res.redirect('/');
};

exports.details = function (req, res) {
  User.find(function (err, user) {
    if (err) return console.error(err);
    res.render('details', {
      title: 'User List',
      user: user
    });
  });
};

exports.delete = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) return console.error(err);
    res.render('details', {
      title: user.username,
      user: user
    });
  });
};