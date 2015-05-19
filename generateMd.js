var fs = require('fs');
var humanize = require('humanize-number');
var Mustache = require('mustache');

var repos = JSON.parse(fs.readFileSync('list.json', { encoding: 'UTF-8' }));
var template = fs.readFileSync('template.mst').toString();

var content = Mustache.render(template, {
	year: new Date().getFullYear(),
	repos: repos.map(preparateRepo)
});

// remove unnecessary page breaks
content = content.replace(/\s{2,}/g, '').replace(/<\/br>/g, '\n');

fs.writeFileSync('README.md', content);


function preparateRepo(repo) {
	return {
		star: repo.stars > 10000,
		cake: repo.stars > 5000 && repo.stars <= 10000,
		avatar: repo.avatar,
		ownerUrl: repo.ownerUrl,
		name: repo.name,
		url: repo.url,
		description: escape(repo.description),
		homepage: repo.homepage,
		stars: humanize(repo.stars),
		language: repo.language
	};
}

function escape(str) {
	return str.replace(/\|.*/g, '').replace(/\s+/g, ' ');
}
