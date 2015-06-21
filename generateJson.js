import request from 'request';
import { map } from 'async';
import fs from 'fs';
import clone from 'clone';
import ProgressBar from 'progress';

const TOKEN = 'f3bdfe1bfa18f84ef0f19eb90adf4d710fdff304';

const options = {
	url: 'https://api.github.com/repos/',
	method: 'GET',
	headers: {
		'User-Agent': 'Super Agent/0.0.1',
		'Authorization': 'token ' + TOKEN
	}
};

const list = fs.readFileSync('list.txt', { encoding: 'UTF-8' }).trim().split('\n');

const bar = new ProgressBar('  generating [:bar] :percent :etas', {
	complete: '=',
	incomplete: ' ',
	width: 20,
	total: list.length
});

map(list, getRepoInfo, (err, data) => {
	fs.writeFileSync('list.json', JSON.stringify(data, null, 4));
});


function getRepoInfo(repoFullName, next) {
	const opts = clone(options);
		opts.url += repoFullName.trim();

	request(opts, (err, res, body) => {

		if (err || res.statusCode !== 200) {
			return next(err);
		}

		const repoInfo = JSON.parse(body);
		bar.tick();

		next(null, {
			name: repoInfo.name,
			description: repoInfo.description,
			url: repoInfo.html_url,
			homepage: repoInfo.homepage,
			avatar: repoInfo.owner.avatar_url,
			ownerUrl: repoInfo.owner.html_url,
			stars: repoInfo.stargazers_count,
			language: repoInfo.language
		});

	});

}
