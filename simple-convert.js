const fs = require('fs');
const puppeteer = require('puppeteer');

async function run() {
    let html = fs.readFileSync('./index.html', 'utf8');
    let browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    let page = await browser.newPage();
    await page.setContent(html);
    await page.pdf({path: './index.pdf', format: 'A4', printBackground: true});
    await browser.close();
}

run();