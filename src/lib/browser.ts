import chrome from "selenium-webdriver/chrome";
import {
    Builder,
    ThenableWebDriver,
    until,
    By,
    IWebDriverOptionsCookie, WebElementPromise, WebElement
} from "selenium-webdriver";
import {WaitCondition} from "./conditions"

export default class Browser {
    private driver: ThenableWebDriver;

    constructor(private browserName: "chrome" | "firefox", options: string[]) {
        const driver = new Builder();
        if (browserName === "chrome") {
            const o = this.setChromeOptions(options)
            driver.setChromeOptions(o);
        } else {
          //  const o = this.setChromeOptions(options)
           // driver.setFirefoxOptions(o);
        }

        this.driver = driver.forBrowser(browserName).build();
    }

    public async navigate(url: string): Promise<void> {
        await this.driver.navigate().to(url);
    }

    public setChromeOptions(options: string[]) {
        const o = new chrome.Options();
        options.map((option) => o.addArguments(option))
        o.setUserPreferences({credential_enable_service: false});
        return o;
    }

    public findElement(selector: string): WebElement {
        return this.driver.wait(until.elementLocated(By.css(selector)), 1000000,
            "Could not locate the child element within the time specified");
       /* let el = await this.driver.wait(until.elementLocated(By.css(selector)), 15000, "Looking for element");
        let elIsDisplayed = await el.isDisplayed()
        while (!elIsDisplayed) {
            el =  await this.driver.wait(until.elementLocated(By.css(selector)), 15000, "Looking for element");
            elIsDisplayed = await el.isDisplayed()
        }
        const a = await el.getTagName()

        return el;*/
    }

    public async clearCookies(url?: string): Promise<void> {
        if (url) {
            const currentUrl = await this.driver.getCurrentUrl();
            await this.navigate(url);
            await this.driver.manage().deleteAllCookies();
            await this.navigate(currentUrl);
        } else {
            await this.driver.manage().deleteAllCookies();
        }
    }

    public async setCookies(cookies: IWebDriverOptionsCookie[], url?: string): Promise<void> {
        if (url) {
            const currentUrl = await this.driver.getCurrentUrl();
            await this.navigate(url);
            cookies.map(async (cookie) => await this.driver.manage().addCookie(cookie) )
            await this.navigate(currentUrl);
        } else {
            cookies.map(async (cookie) => await this.driver.manage().addCookie(cookie) )
        }
    }

    public async getCookies(url?: string): Promise<IWebDriverOptionsCookie[]> {
        if (url) {
            const currentUrl = await this.driver.getCurrentUrl();
            await this.navigate(url);
            const cookies = await this.driver.manage().getCookies()
            await this.navigate(currentUrl);
            return cookies;
        } else {
            return  await this.driver.manage().getCookies()
        }
    }

    public async wait(condition: WaitCondition) {
        await this.waitAny(condition);
    }

    public async waitAny(conditions: WaitCondition | WaitCondition[]): Promise<void> {
        const all = (!(conditions instanceof Array)) ? [ conditions ] : conditions;

        await this.driver.wait(async () => {
            for (const condition of all) {
                try {
                    if (await condition(this) === true) {
                        return true;
                    }
                    continue;
                } catch (ex) {
                    continue;
                }
            }
        });
    }

    public async close(): Promise<void> {
        await this.driver.quit();
    }
}
