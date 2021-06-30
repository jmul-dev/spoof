const puppeteer = require('puppeteer');
const debug = require('debug')('spoof');

const userAgent =
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36';

const main = async () => {
	const browser = await puppeteer.launch({
		headless: false,
	});

	const page = await browser.newPage();
	await page.setUserAgent(userAgent);

	debug('open browser and go to 10best.com');
	try {
		await page.goto('https://www.10best.com/awards/travel/best-attraction-for-car-lovers/mecum-auctions-multiple-locations/');
	} catch (err) {
		debug(`Error: ${err}`);
	}

	debug('click the vote button');
	try {
		await page.$eval('#awardVoteButton', (button) => button.click());
	} catch (err) {
		debug(`Error: ${err}`);
	}

	setTimeout(() => {
		debug('voting completed!');
		browser.close();
	}, 8000);
};

main();
