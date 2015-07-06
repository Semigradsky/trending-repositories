import fs from 'fs';
import humanize from 'humanize-number';
import { render } from 'mustache';

const repos = JSON.parse(fs.readFileSync('list.json', { encoding: 'UTF-8' }));
const template = fs.readFileSync('template.mst').toString();

let content = render(template, {
	year: new Date().getFullYear(),
	repos: repos.map(preparateRepo)
});

// remove unnecessary page breaks with spaces
content = content.replace(/(\s*\r\n\s*|\s*\n\s*|\s*\r\s*)/gm, '');
// remove unnecessary spaces
content = content.replace(/\s{2,}/g, '');
// add page breaks
content = content.replace(/<\/br>/g, '\n');

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
	return str ? str.replace(/\|.*/g, '') : '';
}
