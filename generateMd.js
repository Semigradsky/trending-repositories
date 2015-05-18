var fs = require('fs');
var humanize = require('humanize-number');

var content =
	'## Trending repositories - 2015\n' +
	'|=_=|Owner|Description|Url|Stars|Language|\n' +
	'|:-:|---|---|:-:|--:|:-:|\n';
var homeImg = 'https://assets-cdn.github.com/images/icons/emoji/unicode/1f3e0.png';
var starImg = 'https://assets-cdn.github.com/images/icons/emoji/unicode/2b50.png';
var cakeImg = 'https://assets-cdn.github.com/images/icons/emoji/unicode/1f370.png';

var repos = JSON.parse(fs.readFileSync('list.json', { encoding: 'UTF-8' }));

repos.forEach(function (repo) {
	content +=
		'| ' + (repo.stars > 10000 ? '<img alt=":cake:" src="' + starImg + '" width="20">' :
			(repo.stars > 5000 ? '<img alt=":cake:" src="' + cakeImg + '" width="20">' : '')) +
		'| [<img src="{avatar}" alt="owwner" width="50">]({ownerUrl}) '.replace('{avatar}', repo.avatar).replace('{ownerUrl}', repo.ownerUrl) +
		'| <div>[{name}]({url})</div> '.replace('{name}', repo.name).replace('{url}', repo.url) +
		' {description} '.replace('{description}', repo.description.replace(/\|.*/g, '').replace(/\s+/g, ' ')) +
		(repo.homepage ? '| [<img src="' + homeImg + '" width="30" alt="home">]({homepage})'.replace('{homepage}', repo.homepage) : '| ') +
		'| {stars} '.replace('{stars}', humanize(repo.stars)) +
		(repo.language ? '| *{language}*\n'.replace('{language}', repo.language) : '| \n');
});

fs.writeFileSync('README.md', content);
