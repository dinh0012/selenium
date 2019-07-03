import { NewablePage, Page } from "./page";
import Browser from "./browser"
import DOMElement from "./DOMElement"

export type WaitCondition = (browser: Browser) => Promise<boolean>;

export function elementIsVisible(locator: () => DOMElement): WaitCondition {
    return async () => await locator().isDisplayed();
}

export function elementIsPresent(locator: () => DOMElement): WaitCondition {
    return async () => await locator() !== undefined;
}

export function pageHasLoaded<T extends Page>(page: NewablePage<T>): WaitCondition {
    return (browser: Browser) => {
        const condition = new page(browser).loadCondition();
        return condition(browser);
    };
}
