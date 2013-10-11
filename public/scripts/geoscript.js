var geocoder = require('geocoder'),
	async = require('async'),
	data = require('./members.json'),
	index = 0;

async.map(
	data, 
	function(member,callback) {
		setTimeout(function(){
			geocoder.geocode(member.Office[0], function(error, data){
				if(error){
					callback();
					return;
				}
				member.location = data.results[0].geometry.location;
				callback();
			});
		}, index++*500);
	}, 
	function(){
		console.log(JSON.stringify(data));
	}
);
