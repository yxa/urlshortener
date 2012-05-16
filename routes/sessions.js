module.exports = function(app) {
  app.post('/sessions', createSession);
  app.del('/sessions', destroySession);
}


function createSession(req, res) {
  if('piechef' === req.body.user && '123' === req.body.password) {
    req.session.currentUser = req.body.user;
    req.flash('info','you are logged in');
    res.redirect('/');
    return;
  }

  req.flash('error','those credentials were incorrect');
  res.redirect('/');
};

function destroySession(req, res) {
  req.session.regenerate(function(err) {
    req.flash('info', 'you have been logged out');
    res.redirect('/');
  });
}
