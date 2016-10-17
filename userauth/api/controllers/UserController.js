/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
		signup: function(req, res) {
			console.log('Backend Signup');

			var Passwords = require('machinepack-passwords');

			var passwordEncrypter = Passwords.encryptPassword({
				password: req.param('password'),
				difficulty: 10
			});

			function userCreated(err, newUser) {
				if(err) {
					console.log('Error: ' + err);
					return res.negotiate(err);
				}

				//SESSION VAR
				req.session.me = newUser.id;
				console.log('User added');

				return res.json(
				{
					id: newUser.id
				});
			}

			gravatarExecParams = function(encryptedPassword) {
			return {
					error: function(err) {
						return res.negotiate(err);
					},
					success: function(gravatarUrl) {
						User.create(
						{
							name: req.param('name'),
							email: req.param('email'),
							password: encryptedPassword,
							lastLoggedIn: new Date(),
							gravatarUrl: gravatarUrl
						}, 
						userCreated);
					}
				}
			};

			passwordEncrypterExecParams = 
			{
				error: function(err) {
					return res.negotiate(err);
				},
				success: function(encryptedPassword) {
					var gravatarFetcher = require('machinepack-gravatar').getImageUrl({
						emailAddress: req.param('email')
					});

					gravatarFetcher.exec(gravatarExecParams(encryptedPassword));
				}
			}

			passwordEncrypter.exec(passwordEncrypterExecParams);

		},

		login: function(req, res) {
			User.findOne({
				email: req.param('email')
			}, function foundUser(err, user) {
				if(err) {
					return res.negotiate();
				}
				if(!user) {
					return res.notFound();
				}

				var Passwords = require('machinepack-passwords');

				Passwords.checkPassword({
						passwordAttempt: req.param('password'),
						encryptedPassword: user.password
				}).exec({
					error: function(err) {
							return res.negotiate(err);
					},
					incorrect: function() {
							console.log('Password incorrect');
							return res.notFound();
					},
					success: function() {
						req.session.me = user.id;
						
						console.log('SUCCESS');
						return res.ok();
					}
				})
			});
		},

		logout: function(req, res) {
				User.findOne({
					id: req.session.me
				}, function(err, user) {
					if( err ) {
							return res.negotiate(err);
					}
					if(!user) {
						return res.notFound();
					}

					req.session.me = null;

					return res.redirect('/');
				});
		}
};

