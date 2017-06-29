'use strict';

var path = process.cwd();
var WinHandler = require(path + '/app/controllers/winHandler.server.js');
var PublicHandler = require(path + '/app/controllers/publicHandler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}
	
	function isNotLoggedIn (req, res, next) {
		//if (req.isAuthenticated()) {
			return next();
		//} else {
			//res.redirect('/login');
		//}
	}

	var winHandler = new WinHandler();
	var publicHandler = new PublicHandler();

	app.route('/')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});
		
	app.route('/allwins')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/allWins.html');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.route('/api/:id/wins')
		.get(isLoggedIn, winHandler.getWins);
		//.post(isLoggedIn, winHandler.addWin)
		//.delete(isLoggedIn, winHandler.deleteWin);
		
	app.route('/api/:id/winsadd')
		.post(isLoggedIn, winHandler.addWin);
		
	app.route('/api/:id/winsdel')
		.delete(isLoggedIn, winHandler.deleteWin);
		
	app.route('/api/:id/winslike')
		.post(isLoggedIn, winHandler.likeWin);
		
	/*app.route('/api/:id/winsunlike')
		.get(isLoggedIn, winHandler.unLikeWin);*/
		
	app.route('/api/:id/public')
		.get(isNotLoggedIn, publicHandler.getWins);
		
	app.route('/api/:id/allwins')
		.get(isLoggedIn, winHandler.getAllWins);
		
};
