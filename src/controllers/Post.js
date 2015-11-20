var models = require('../models');

var Post = models.Post;
var Account = models.Account;

var mainPage = function(req, res) {
	if (req.query.user) {
		Post.PostModel.findByOwnerName(req.query.user, function(err, docs) {
			if (err) {
				console.log(err);
				return res.status(400).json({err: 'An error occured'});
			}
			
			res.render('app', {csrfToken: req.csrfToken(), posts: docs, all: false});
		});
	} else {
		Post.PostModel.queryAll(function(err, docs) {
			if (err) {
				console.log(err);
				return res.status(400).json({err: 'An error occured'});
			}
			
			res.render('app', {csrfToken: req.csrfToken(), posts: docs, all: true});
		});
	}
};
module.exports.mainPage = mainPage;

var makePost = function(req, res) {
	Account.AccountModel.findById(req.session.account._id, function(err, docs) {
		var username;
		if (err) username = 'Unknown';
		else { username = docs.username; }
		
		var postData = {
			owner: req.session.account._id,
			ownerName: username,
			content: req.body.content
		};
		
		var newPost = new Post.PostModel(postData);
		newPost.save(function(err) {
			if (err) {
				return res.status(400).json({err: 'An error occured.'});
			}
			
			res.json({redirect: '/main'});
		});
	});
};
module.exports.makePost = makePost;