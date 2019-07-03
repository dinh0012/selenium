import {WebElement, WebElementPromise} from "selenium-webdriver";

export default class DOMElement {
    constructor(protected element: WebElement) {}

    public async click() {
        try {
            return await this.element.click();
        } catch (clickErr) {
            try {
                await this.element.getDriver().executeScript("arguments[0].click();", this.element);
            } catch (jsErr) {
               // throw clickErr;
            }
        }
    }

    public async isDisplayed() {
        try {
            return await this.element.isDisplayed();
        } catch (ex) {
            return false;
        }
    }

    public async getText() {
        return await this.element.getText();
    }

    public async isDisabled() {
        try {
            return await this.element.getAttribute("disabled") === "disabled";
        } catch (ex) {
            return false;
        }
    }

    public async setText(text: string) {
        try {
            return await this.element.sendKeys(text);
        } catch (clickErr) {
            throw clickErr;
        }
    }

}
