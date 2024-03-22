const { expect } = require('@playwright/test');

export class ResultPage {

    /**
     * @param {import('@playwright/test').Page} page
     */

    constructor(page) {
        this.page = page;
    }

    async getPopUpMessageFirstLineOfText() {
        return await this.page.locator('//div[@class="modal"]//h1').textContent();
    }

    async getPopUpMessageSecondLineOfText() {
        return await this.page.locator('//div[@class="modal"]//p[1]').textContent();
    }

    async getPopUpMessageThirdLineOfText() {
        return await this.page.locator('//div[@class="modal"]//p[2]').textContent();
    }
}