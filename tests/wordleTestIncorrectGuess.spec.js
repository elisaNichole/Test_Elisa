const { test, expect } = require('@playwright/test');
const { WordlePage } = require('../pageObjects/wordleHomepage/WordleHomepage');

test.describe('WA_001 Loose Wordle Game Test', () => {
    let wordlePage;
    var expectedMessageFirstLine = 'Sorry, you loose!';
    var expectedMessageSecondLine = 'The word was:';
    var expectedMessageThirdLine = 'Better luck next time :)';

    test.beforeEach(async ({
        page
    }) => {
        wordlePage = new WordlePage(page);
        await page.goto('http://localhost:3000/');
        await expect(page).toHaveTitle(/React App/);
    });

    test('you loose message displays', async ({
        page
    }) => {
        await wordlePage.enterLetterInBox(1, 0);
        await wordlePage.enterLetterInBox(2, 1);
        await wordlePage.enterLetterInBox(3, 2);
        await wordlePage.enterLetterInBox(4, 3);
        await wordlePage.enterLetterInBox(5, 4);
        await wordlePage.enterLetterInBox(6, 5);
        await expect(await wordlePage.getPopUpMessageFirstLineOfText()).toEqual(expectedMessageFirstLine);
        await expect(await wordlePage.getPopUpMessageSecondLineOfText()).toContain(expectedMessageSecondLine);
        await expect(await wordlePage.getPopUpMessageThirdLineOfText()).toEqual(expectedMessageThirdLine);
    });
});