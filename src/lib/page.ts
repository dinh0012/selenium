import Browser from "./browser"
import {WaitCondition} from "./conditions"

export type NewablePage<T extends Page> = new(browser: Browser) => T;

export abstract class Page {
    private url: string;

    constructor(protected browser: Browser) {

    }

    public async navigate(): Promise<void> {
        await this.browser.navigate(this.url);
        await this.browser.wait(this.loadCondition());
    }

    public abstract loadCondition(): WaitCondition;

    protected setUrl(url: string) {
        this.url = url;
    }
}
