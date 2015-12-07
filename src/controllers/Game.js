var models = require('../models');

var mainPage = function(req, res) {
	res.render('main', {csrfToken: req.csrfToken()});
};
module.exports.mainPage = mainPage;

var mapMakerPage = function(req, res) {
	res.render('mapMaker', {csrfToken: req.csrfToken()});
};
module.exports.mapMakerPage = mapMakerPage;