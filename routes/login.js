module.exports = function(app) {
  app.get('/login',login);
}

function login(req, res) {
  res.render('login', {title: 'login'});
};
