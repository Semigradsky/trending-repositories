var request = require('request');
var async = require('async');
var fs = require('fs');
var path = require('path');
var clone = require('clone');
var ProgressBar = require('progress');

var TOKEN = 'f3bdfe1bfa18f84ef0f19eb90adf4d710fdff304';

var options = {
	url: 'https://api.github.com/repos/',
	method: 'GET',
	headers: {
		'User-Agent': 'Super Agent/0.0.1',
		'Authorization': 'token ' + TOKEN
	}
};

var list = fs.readFileSync('list.txt', { encoding: 'UTF-8' }).trim().split('\n');

var bar = new ProgressBar('  generating [:bar] :percent :etas', {
	complete: '=',
	incomplete: ' ',
	width: 20,
	total: list.length
});

async.map(list, getRepoInfo, function complete(err, data) {
	fs.writeFileSync('list.json', JSON.stringify(data, null, 4));
});


function getRepoInfo(repoFullName, next) {
	var opts = clone(options);
		opts.url += repoFullName.trim();

	request(opts, function onRequest(err, res, body) {

		if (err || res.statusCode !== 200) {
			return next(err);
		}

		var repoInfo = JSON.parse(body);
		bar.tick();

		next(null, {
			name: repoInfo.name,
			description: repoInfo.description,
			url: repoInfo.html_url,
			homepage: repoInfo.homepage,
			avatar: repoInfo.owner.avatar_url,
			stars: repoInfo.stargazers_count
		});

	});

}
