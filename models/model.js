var db = require('../config/db.config');
const scraperController = require('../src/pageScrapper');


//--------Scrappe page then save to database --------------//
// 1. describe database connection function
const connectTodb = async () => {
    return db;
}
//2. Then scrapping function
const runScraper = async () => {
    let scrapedData = await scraperController()
    return scrapedData
}
//3. Then saving to database function
const writeToDb = async (scrapedData, dbConn) => {
    // exportsto = exportsTo
    const post = {
        businessName: scrapedData.businessName,
        contact: scrapedData.contact,
        phoneNumber: scrapedData.phoneNumber,
        emailAddress: scrapedData.emailAddress,
        exportsTo: scrapedData.exportsTo.join(",")
    }
    dbConn.query('INSERT INTO companies SET ?', post, function (error, results, fields) {
        if (error) throw error;
    });
}
//Lastly run all the three functions asynchronously
const scraper = async () => {
    let scrapedData = await runScraper()
    dbConn = await connectTodb()
    scrapedData.map(async (data, index) => {
        await writeToDb(data, dbConn)
    })
    await dbConn.end()
    console.log("Database updated with scraped data")
}

module.exports = scraper;