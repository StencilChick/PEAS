// import
var controllers = require('./controllers');
var mid = require('./middleware');

var router = function(app) {
	app.get('/signin', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
	app.post('/signin', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
	app.get('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signupPage);
	app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
	app.get('/signout', mid.requiresLogin, controllers.Account.logout);
	app.get('/main', mid.requiresLogin, controllers.Post.mainPage);
	app.post('/main', mid.requiresLogin, controllers.Post.makePost);
	app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;