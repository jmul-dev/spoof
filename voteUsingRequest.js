const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const request = require('request');
const debug = require('debug')('spoof');

const userAgent =
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36';

const getValidationKey = async (voteKey) => {
	const reqOptions = {
		url: `https://www.10best.com/common/ajax/voteKey.php?key=${encodeURIComponent(voteKey)}`,
		headers: {
			'User-Agent': userAgent,
		},
	};

	return new Promise((resolve, reject) => {
		request(reqOptions, (err, res, body) => {
			if (!err && res.statusCode == 200) {
				resolve(JSON.parse(body).results?.validationKey);
			} else {
				reject();
			}
		});
	});
};

const vote = async (staticVoteKey, validationKey) => {
	const reqOptions = {
		url: `https://www.10best.com/common/ajax/vote.php?voteKey=${encodeURIComponent(staticVoteKey)}&validationKey=${encodeURIComponent(
			validationKey
		)}&email=undefined&c=${Math.random()}`,
		headers: {
			'User-Agent': userAgent,
		},
	};

	return new Promise((resolve, reject) => {
		request(reqOptions, (err, res, body) => {
			if (!err && res.statusCode == 200) {
				debug(body);
				resolve(true);
			} else {
				reject();
			}
		});
	});
};

const main = async () => {
	const browser = await puppeteer.launch({
		headless: true,
	});

	const page = await browser.newPage();
	await page.setUserAgent(userAgent);

	debug('open browser in the background and go to 10best.com');
	await page.goto('https://www.10best.com/awards/travel/best-attraction-for-car-lovers/mecum-auctions-multiple-locations/');

	debug('get the page source code');
	const content = await page.content();

	const $ = cheerio.load(content);

	debug('find the voteKeys');
	const voteKey = $('#awardVoteButton').attr('onclick').slice(6, -2);
	const staticVoteKey = $('#voteKey').val();

	debug(`voteKey found: ${voteKey}`);
	debug(`staticVoteKey found: ${staticVoteKey}`);

	debug('send request to get the validationKey');
	const validationKey = await getValidationKey(voteKey);

	debug(`validationKey returned: ${validationKey}`);

	debug('send request to vote');
	await vote(staticVoteKey, validationKey);

	browser.close();
};

main();
