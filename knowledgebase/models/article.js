var mongoose = require('mongoose');

var articleSchema = mongoose.Schema({
	title: {
		type: String,
		index: true,
		required: true
	},
	category: {
		type: String,
		index: true,
		required: true
	},
	body: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
});

var Article = module.exports = mongoose.model('Article', articleSchema);

module.exports.getArticles = function(callback) {
	Article.find(callback);
};

module.exports.getArticleById = function(id, callback) {
	Article.findById(id, callback);
};

module.exports.getArticlesByCategory = function(category, callback) {
	var query = { category: category }
	Article.find(query, callback);
};

module.exports.createArticle = function(newArticle, callback) {
	newArticle.save(callback);
}

module.exports.updateArticle = function(id, data, callback) {
	var title = data.title;
	var category = data.category;
	var body = data.body;

	Article.findById(id, function(err, article) {
		if(!article) {
			return next(new Error('Could not load article!')); // What is this? I think it's an error.
		} else {
			article.title = title;
			article.category = category;
			article.body = body;

			article.save(callback);
		}
	});
}

module.exports.removeArticle = function(id, callback) {
	Article.findById(id).remove(callback);
}