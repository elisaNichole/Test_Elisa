const { test, expect } = require('@playwright/test');
const { WordlePage } = require('../pageObjects/wordleHomepage/WordleHomepage');

test.describe('WA_002 Win Wordle Game Test', () => {
    let wordlePage;
    var expectedMessageFirstLine = 'You Win!';
    var expectedMessageSecondLine = 'The word was: ccccc';
    var expectedMessageThirdLine = 'You found the solution in 3 guesses :)';

    test.beforeEach(async ({
        page
    }) => {
        wordlePage = new WordlePage(page);
        await page.goto('http://localhost:3000/?test=ccccc');
        await expect(page).toHaveTitle(/React App/);
    });

    test('you win message displays', async ({
        page
    }) => {
        await wordlePage.enterLetterInBox(1, 0);
        await wordlePage.enterLetterInBox(2, 1);
        await wordlePage.enterLetterInBox(3, 2);
        await expect(await wordlePage.getPopUpMessageFirstLineOfText()).toEqual(expectedMessageFirstLine);
        await expect(await wordlePage.getPopUpMessageSecondLineOfText()).toEqual(expectedMessageSecondLine);
        await expect(await wordlePage.getPopUpMessageThirdLineOfText()).toEqual(expectedMessageThirdLine);
    });
});