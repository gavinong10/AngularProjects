
module.exports = {
		checkUser: function(req, res) {
			if(!req.session.me) {
				console.log('You are NOT logged in');
				return res.view('login');
			}

			console.log('You are logged in!');
			return res.view('dashboard');
		},

		getUser: function(req, res) {
			User.findOne({ id: req.session.me }, function(err, user) {
					if(err) {
						return res.negotiate(err);
					}

					res.send(user);
			});
		}
};

