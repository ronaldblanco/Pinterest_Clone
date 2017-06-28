'use strict';

var Users = require('../models/users.js');
var url = require("urlparser");

function PublicHandler () {

	this.getWins = function (req, res) {
		Users
			.find({}, {})
			.exec(function (err, result) {
				if (err) { throw err; }
				
				var final = [];
				result.forEach(function(user){
					user.wins.images.forEach(function(image){
						final.push(image);
					});
					
				});
				//console.log(final);
				res.send(final);
			});
	};

	/*this.addWin = function (req, res) {
		
		var myUrl = url.parse(req.originalUrl);
		//console.log(myUrl.query);
		var newWin = {'name': unescape(myUrl.query.params.name), 'image':myUrl.query.params.image, 'username':req.user.github.username, 'userimage':'https://static.pexels.com/photos/55787/pexels-photo-55787.jpeg' };
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { $push: { 'wins.images': newWin } })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.wins);
				}
			);
	};*/

	/*this.deleteWin = function (req, res) {
		var myUrl = url.parse(req.originalUrl);
		//console.log(myUrl.query);
		//var newWin = {'name': unescape(myUrl.query.params.name), 'image':myUrl.query.params.image, 'username':req.user.github.username, 'userimage':'https://static.pexels.com/photos/55787/pexels-photo-55787.jpeg' };
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { $pull: { 'wins.images': { name:unescape(myUrl.query.params.name)} }  })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.wins);
				}
			);
	};*/

}

module.exports = PublicHandler;
