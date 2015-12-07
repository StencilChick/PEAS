// import
var controllers = require('./controllers');
var mid = require('./middleware');

var router = function(app) {
	// log in
	app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
	app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

	// sign up
	app.get('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signupPage);
	app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
	
	// log out
	app.get('/logout', mid.requiresLogin, controllers.Account.logout);
	
	// game
	app.get('/main', mid.requiresLogin, controllers.Game.mainPage);
	app.get('/mapMaker', mid.requiresLogin, controllers.Game.mapMakerPage);
	
	app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;