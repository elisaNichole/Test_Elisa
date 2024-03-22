const { expect } = require('@playwright/test');

export class HomePage {

    constructor(page) {
        this.page = page;
    }

    async enterLetterInBox(row, letterPosition) {
        const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f'];
        this.row = row;
        this.letterPosition = letterPosition;
        let div = 1;
        for (let i = 0; i < 5; i++) {
            const boxLocator = `//div[${row}][contains(@class,"row")]/div[${div}]`;
            await this.page.locator(boxLocator, row, div).type(LETTERS[letterPosition]);
            div++;
        }
        await this.page.keyboard.press('Enter');
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

    async getBoxColorByRow(row){
        this.row = row;
        let div = 1;
        const colors = [];
        for (let i = 0; i < 5; i++) {
            const locator = `//div[${row}][contains(@class,"row past")]/div[${div}]`;
            const color = await this.page.locator(locator, row, div).getAttribute("class");
            colors.push(color);
            div++;
        }
        return colors;
    }
}