var fs = require('fs');

var content = '## Trending repositories - 2015\n||Name|Description|Stars|\n|---|---|---|---|\n';
var repos = JSON.parse(fs.readFileSync('list.json', { encoding: 'UTF-8' }));

repos.forEach(function (repo) {
	content +=
		'| <img src="{avatar}" alt="owwner" width="50"> '.replace('{avatar}', repo.avatar) +
		'| [{name}]({url}) '.replace('{name}', repo.name).replace('{url}', repo.url) +
		'| {description} '.replace('{description}', repo.description) +
		(repo.homepage ? '| [<img src="https://assets-cdn.github.com/images/icons/emoji/unicode/1f3e0.png" width="30" alt="home">]({homepage})'.replace('{homepage}', repo.homepage) : '| ') +
		'| {stars}\n'.replace('{stars}', repo.stars);
});

fs.writeFileSync('README2.md', content);
