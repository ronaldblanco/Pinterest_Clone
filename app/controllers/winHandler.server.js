'use strict';

var Users = require('../models/users.js');
var url = require("urlparser");

function WinHandler () {

	this.getWins = function (req, res) {
		Users
			.findOne({ 'github.id': req.user.github.id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result.wins);
			});
	};

	this.addWin = function (req, res) {
		
		var myUrl = url.parse(req.originalUrl);
		console.log(myUrl.query);
		var newWin = {'name': unescape(myUrl.query.params.name), 'image':myUrl.query.params.image, 'username':req.user.github.username, 'userimage':'https://static.pexels.com/photos/55787/pexels-photo-55787.jpeg' };
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { $push: { 'wins.images': newWin } })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.wins);
				}
			);
	};

	/*this.deleteWin = function (req, res) {
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { 'nbrClicks.clicks': 0 })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.nbrClicks);
				}
			);
	};*/

}

module.exports = WinHandler;
