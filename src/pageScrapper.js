const puppeteer = require("puppeteer");

const retrieveData = async () => {
    let url = "https://seafoodfromcanada.ca/directory/";
    const browser = await puppeteer.launch(url, {
        headless: false,
        args: [
            '--ignore-certificate-errors',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--window-size=1920,1080',
            "--disable-accelerated-2d-canvas",
            "--disable-gpu"],
        'ignoreHTTPSErrors': true
    });
    const page = await browser.newPage();
    console.log(`Going to retrieve data from ${url}...`);
    await page.goto(url);

    let scrapedData = [];
    let count = 0;

    async function scrapeCurrentPage() {
        await page.waitForSelector('.main-content');
        let urls = await page.$$eval('div article.gi', links => {
            links = links.map(el => el.querySelector('a').href)
            return links;
        });
        // Loop through each of those links, open a new page instance and get the relevant data from them
        let pagePromise = (link) => new Promise(async (resolve, reject) => {
            let dataObj = {};
            let newPage = await browser.newPage();
            await newPage.goto(link);

            // Scrap for these data
            dataObj['businessName'] = await newPage.$eval('h1.article-title', text => text.textContent);
            try {
                dataObj['contact'] = await newPage.$eval('.font-size-25 span', text => text.textContent);
            } catch (err) {
                dataObj['contact'] = '';
            }
            dataObj['phoneNumber'] = await newPage.$eval('.listing-data p', text => text.textContent);
            try {
                dataObj['emailAddress'] = await newPage.$eval('.listing-data p a', text => text.textContent);
            } catch (err) {
                dataObj['emailAddress'] = '';
            }

            dataObj['exportsTo'] = await newPage.$$eval('.listing-export ul>li span', continents => continents.map(name => name.textContent));

            resolve(dataObj);
            await newPage.close();
        });

        // Invoking the promise
        for (link in urls) {
            let currentPageData = await pagePromise(urls[link]);
            scrapedData.push(currentPageData);
            console.log(currentPageData)
        }

        if (count !== 1) {
            count += 1;
            await page.click('.f-navigation a.f-next');
            return scrapeCurrentPage(); // Call this function recursively
        }

        await page.close();
        return scrapedData;
    }
    let companies = await scrapeCurrentPage();
    console.log(companies);

    return companies;
};

module.exports = retrieveData;