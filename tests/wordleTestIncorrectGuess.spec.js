const { test, expect } = require('@playwright/test');
const { BASE_URL, PAGE_TITLE } = require('./constants');
const { HomePage } = require('../pageObjects/HomePage');
const { ResultPage } = require('../pageObjects/ResultPage');

test.describe('WA_001 Loose Wordle Game Test', () => {
    let homePage;
    let resultPage;
    const expectedMessageFirstLine = 'Sorry, you loose!';
    const expectedMessageSecondLine = 'The word was:';
    const expectedMessageThirdLine = 'Better luck next time :)';

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        resultPage = new ResultPage(page);
        await page.goto(BASE_URL);
        await expect(page).toHaveTitle(PAGE_TITLE);
    });

    test('you loose message displays', async ({ page }) => {
        await homePage.enterLetterInBox(1, 0);
        await homePage.enterLetterInBox(2, 1);
        await homePage.enterLetterInBox(3, 2);
        await homePage.enterLetterInBox(4, 3);
        await homePage.enterLetterInBox(5, 4);
        await homePage.enterLetterInBox(6, 5);
        expect(await resultPage.getPopUpMessageFirstLineOfText()).toEqual(expectedMessageFirstLine);
        expect(await resultPage.getPopUpMessageSecondLineOfText()).toContain(expectedMessageSecondLine);
        expect(await resultPage.getPopUpMessageThirdLineOfText()).toEqual(expectedMessageThirdLine);
    });
});