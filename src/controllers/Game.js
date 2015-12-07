var models = require('../models');

var mainPage = function(req, res) {
	res.render('main', {csrfToken: req.csrfToken()});
};
module.exports.mainPage = mainPage;