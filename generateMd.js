var fs = require('fs');

var content = '## Trending repositories - 2015\n|Owner|Name|Description|Url|Stars|\n|---|---|---|---|---|\n';
var homeImg = 'https://assets-cdn.github.com/images/icons/emoji/unicode/1f3e0.png';

var repos = JSON.parse(fs.readFileSync('list.json', { encoding: 'UTF-8' }));

repos.forEach(function (repo) {
	content +=
		'| [<img src="{avatar}" alt="owwner" width="50">]({ownerUrl}) '.replace('{avatar}', repo.avatar).replace('{ownerUrl}', repo.ownerUrl) +
		'| [{name}]({url}) '.replace('{name}', repo.name).replace('{url}', repo.url) +
		'| {description} '.replace('{description}', repo.description.replace(/\|.*/, '')) +
		(repo.homepage ? '| [<img src="' + homeImg + '" width="30" alt="home">]({homepage})'.replace('{homepage}', repo.homepage) : '| ') +
		'| {stars}\n'.replace('{stars}', repo.stars);
});

fs.writeFileSync('README.md', content);
