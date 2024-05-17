const fs = require('fs');
const handlebars = require('handlebars');
const puppeteer = require('puppeteer');

async function run() {
    let source = fs.readFileSync('./index.hbs', 'utf8');
    let template = handlebars.compile(source);
    let dynamic = { title: 'Dynamic' };
    let hbs = template(dynamic);
    let browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    let page = await browser.newPage();
    await page.setContent(hbs);
    await page.pdf({path: 'index.hbs.pdf', format: 'A4', printBackground: true});
    await browser.close();
}

run();