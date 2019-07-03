import Browser from "./lib/browser";
import DOMElement from "./lib/DOMElement";
import {elementIsVisible} from "./lib/conditions";
export function findBy(selector: string) {
    return (target: any, propertyKey: string) => {
        const type = Reflect.getMetadata("design:type", target, propertyKey);
        Object.defineProperty(target, propertyKey, {
            configurable: true,
            enumerable: true,
            get() {
                const promise = (this as any).browser.findElement(selector);
                return new type(promise, selector);
            },
        });
    };

    const options = ["--no-sandbox", "start-fullscreen"]
    const browser = new Browser("chrome", options);
    browser.navigate("https://accounts.google.com/signin/v2/identifier" +
    "?hl=vi&passive=true&continue=https%3A%2F%2Fwww.google.com%2F%3Fgws_rd%3Dssl&flowName=" +
    "GlifWebSignIn&flowEntry=ServiceLogin")

    const main = async () => {

    const inputMail = new DOMElement(browser.findElement("#identifierId"));
    const btnNext = new DOMElement(browser.findElement("#identifierNext"));
    const inputPass = new DOMElement(browser.findElement("input[type=password]"));
    const inputNextPass = new DOMElement(browser.findElement("#passwordNext"))

    await inputMail.setText("vandinh020304")
    await btnNext.click()

    await browser.wait(elementIsVisible(() => inputPass))

    await inputPass.setText("anhdinh10a")

    await inputNextPass.click()

}
    main();
