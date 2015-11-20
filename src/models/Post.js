var mongoose = require('mongoose');

var PostModel;

var PostSchema = new mongoose.Schema({
	createdDate: {
		type: Date,
		default: Date.now,
		unique: true
	},
	
	content: {
		type: String,
		required: true
	},
	
	owner: {
		type: mongoose.Schema.ObjectId,
		required: true,
		ref: 'Account'
	},
	
	ownerName: {
		type: String,
		required: true,
		trim: true
	}
});

PostSchema.statics.findByOwner = function(owner, callback) {
	var search = { owner: mongoose.Types.ObjectId(owner) };
	
	return PostModel.find(search).sort([['createdDate', 'descending']]).select("content ownerName").exec(callback);
};

PostSchema.statics.findByOwnerName = function(ownerName, callback) {
	var search = { ownerName: ownerName };
	
	return PostModel.find(search).sort([['createdDate', 'descending']]).select("content ownerName").exec(callback);
};

PostSchema.statics.queryAll = function(callback) {
	return PostModel.find().sort([['createdDate', 'descending']]).select("content ownerName").exec(callback);
};

PostModel = mongoose.model('Post', PostSchema);

module.exports.PostSchema = PostSchema;
module.exports.PostModel = PostModel;