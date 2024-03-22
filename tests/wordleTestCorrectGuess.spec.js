const { test, expect } = require('@playwright/test');
const { BASE_URL, PAGE_TITLE } = require('./constants');
const { HomePage } = require('../pageObjects/HomePage');
const { ResultPage } = require('../pageObjects/ResultPage');

test.describe('WA_002 Win Wordle Game Test', () => {
    let homePage;
    let resultPage;
    const expectedMessageFirstLine = 'You Win!';
    const expectedMessageSecondLine = 'The word was: ccccc';
    const expectedMessageThirdLine = 'You found the solution in 3 guesses :)';

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        resultPage = new ResultPage(page);
        await page.goto(BASE_URL + '?test=ccccc');
        await expect(page).toHaveTitle(PAGE_TITLE);
    });

    test('you win message displays', async ({ page }) => {
        await homePage.enterLetterInBox(1, 0);
        await homePage.enterLetterInBox(2, 1);
        await homePage.enterLetterInBox(3, 2);
        expect(await resultPage.getPopUpMessageFirstLineOfText()).toEqual(expectedMessageFirstLine);
        expect(await resultPage.getPopUpMessageSecondLineOfText()).toEqual(expectedMessageSecondLine);
        expect(await resultPage.getPopUpMessageThirdLineOfText()).toEqual(expectedMessageThirdLine);
    });
});