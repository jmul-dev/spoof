const request = require('request');

const reqOptions = {
	url: 'https://www.10best.com/common/ajax/voteKey.php?key=YToyOntpOjA7czozMzoiMjA3NTc2NTA2NzYwZGMyOGQ4OTZjZDkwLjcxMjI3MTY1IjtpOjE7czoxOToiMjAyMS0wNi0zMCAwNDoxODozMiI7fQ==',
	headers: {
		'User-Agent':
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
	},
};

request(reqOptions, (err, res, body) => {
	console.log(body);
});
