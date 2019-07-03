const {Builder, By, until} = require('selenium-webdriver');

const chrome = require('selenium-webdriver/chrome');
let o = new chrome.Options();
// o.addArguments('start-fullscreen');
//o.addArguments('--headless')
o.addArguments('--no-sandbox')
//o.addArguments('--disable-dev-shm-usage')
//o.addArguments('disable-infobars');
 //o.addArguments('headless'); // running test on visual chrome browser
o.setUserPreferences({ credential_enable_service: false });

var Page = function() {
    this.driver = new Builder()
        .setChromeOptions(o)
        .forBrowser('chrome')
        .build();

    this.addCookie = async function(cookie) {
        return await this.driver.manage().addCookie(cookie);
    }

    this.getCookies = async function() {
        return await this.driver.manage().getCookies();
    }

    // visit a webpage
    this.visit = async function(theUrl) {
        return await this.driver.get(theUrl);
    };

    // quit current session
    this.quit = async function() {
        return await this.driver.quit();
    };

    // wait and find a specific element with it's id
    this.findById = async function(id) {
         return await this.driver.wait(until.elementLocated(By.id(id)), 15000, 'Looking for element');
    };

    this.findByCss = async function(id) {
        const a = await this.driver.wait(until.elementLocated(By.css(id)), 15000, 'Looking for element');
        return a;
    };

    // wait and find a specific element with it's name
    this.findByName = async function(name) {
        await this.driver.wait(until.elementLocated(By.name(name)), 15000, 'Looking for element');
        return await this.driver.findElement(By.name(name));
    };

    this.sleep = async function(ms) {
        return  await this.driver.sleep(ms);
    };

    // fill input web elements
    this.write = async function (el, txt) {
        return await el.sendKeys(txt);
    };
};
const page = new Page();
const  a = async () => {
    await page.visit('http://google.com')
    await page.addCookie({
        name: 'VERP-TOKEN',
        value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo2MCwiZW1haWwiOiJkaW5obnZAdm5leHQuY29tLnZuIiwidXNlcm5hbWUiOiJkaW5obnYiLCJmaXJzdG5hbWUiOiJOZ3V54buFbiBWxINuIiwibGFzdG5hbWUiOiJExKluaCIsImRlcGFydG1lbnRfaWQiOjUsInN1ZmZpeCI6ImNocm9tZS0xMCJ9LCJoYXNoIjoiMTliOWRkM2Y3OTQ2NGU0MDNhYjA3MjIyNDliYzdiYjEiLCJpYXQiOjE1NTk4NzU0OTgsImV4cCI6MTU2MjQ2NzQ5OCwiaXNzIjoidi1uZXh0In0.aGZoJoQzxczvSsQjLDvXrsdZ6mRemm0IPpk_9BpySfk',
    })
    await page.addCookie({
        name: 'VALIDATION-KEY',
        value: 'F0PS2u25HHGUmeRKWVb4',
    })
    console.log(page.driver.headers)
    const a1 = await page.getCookies();
    console.log(a1)
    const a = await page.findByCss('.btn-social')
    a.click();
    const b = await page.findById('identifierId')
    b.sendKeys('vandinh020304');
    const c = await page.findById('identifierNext')
    c.click();
    let d = await page.findByCss('input[type=password]')
    let k = await d.isDisplayed()
    while (!k) {
        d = await page.findByCss('input[type=password]')
        k = await d.isDisplayed()
    }
    d.sendKeys('anhdinh10a');
    const e = await page.findById('passwordNext')
    e.click();


}
a();
