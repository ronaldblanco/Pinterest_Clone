'use strict';

var Users = require('../models/users.js');
var Users1 = require('../models/users.js');
var url = require("urlparser");

//var gm = require('gm');
var request = require('request');
//var url = "http://strabo.com/gallery/albums/wallpaper/foo_wallpaper.sized.jpg";
var imagesize = require('imagesize');

		/*function imageSize(url){
			var stream = request(url);
			imagesize(stream, function (err, result) {
				if (err) { throw err; }
				
    				console.log('result of fuction->'+result); // {type, width, height}
    				return JSON.parse(result);
				
			});
		}*/

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
		//var info = {};
		//console.log(myUrl.query);
		
		var stream = request(myUrl.query.params.image);
		imagesize(stream, function (err, result) {
			if (err) { throw err; }
				
    			//console.log('result of fuction->'+result); // {type, width, height}
    			var info = result;
    			
    			
    			
    			
    	//var info = imageSize(myUrl.query.params.image);
		//console.log(info);
		var newWin = {'name': unescape(myUrl.query.params.name), 'image':myUrl.query.params.image, 'username':req.user.github.username, 'userimage':'https://static.pexels.com/photos/55787/pexels-photo-55787.jpeg', 'likes': Array(), 'info': info};
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { $push: { 'wins.images': newWin } })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.wins);
				}
			);		
    			
    			
    			
    			
				
		});
		
		
	};

	this.deleteWin = function (req, res) {
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
	};
	
	this.likeWin = function (req, res) {
		var myUrl = url.parse(req.originalUrl);
		console.log(myUrl.query);
		Users
			.findOne({ 'github.username': myUrl.query.params.username }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }
				
				var count = 0;
				result.wins.images.forEach(function(image){
					if(image.name == unescape(myUrl.query.params.name)){
						image.likes.forEach(function(like){
							if(like == req.user.github.id) count++;
						})
					}
					
				})
				
				if(count == 0){//like
					
					Users1
						.findOneAndUpdate({ 'github.username': myUrl.query.params.username, 'wins.images.name':unescape(myUrl.query.params.name)}, { $push: { 'wins.images.$.likes': req.user.github.id } })
						.exec(function (err, result) {
								if (err) { throw err; }

								//console.log(result.wins);
								//res.json(result.wins);
							}
						);
					
				}else if(count == 1 || count > 1){//unlike
					
					Users1
						.findOneAndUpdate({ 'wins.images.name':unescape(myUrl.query.params.name), 'wins.images.likes': req.user.github.id }, { $pull: { 'wins.images.$.likes': req.user.github.id } })
						.exec(function (err, result) {
								if (err) { throw err; }

								//res.json(result.wins);
							}
						);
					
				}	

				res.json(result.wins);
			});
		//var newLike = {'name': unescape(myUrl.query.params.name), 'username':myUrl.query.params.username };
		
	};
	
	this.getAllWins = function (req, res) {
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
	
	/*this.unLikeWin = function (req, res) {
		var myUrl = url.parse(req.originalUrl);
		//console.log(myUrl.query);
		//var newLike = {'name': unescape(myUrl.query.params.name), 'username':myUrl.query.params.username };
		Users
			.findOneAndUpdate({ 'wins.images.name':unescape(myUrl.query.params.name), 'wins.images.likes': req.user.github.id }, { $pull: { 'wins.images.$.likes': req.user.github.id } })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.wins);
				}
			);
	};*/

}

module.exports = WinHandler;
