const locators = require("../locators/loginlogout");
const fs = require('node:fs');
const path = require('node:path');

class loginPage {
  constructor(page) {
    this.page = page;
  }
  async open() {
    await this.page.goto("https://katalon-demo-cura.herokuapp.com/profile.php#login");
  }
  async inputUsername(username) {
    await this.page.locator(locators.usernameInput).fill(username);
  }
  async inputPassword(password) {
    await this.page.locator(locators.passwordInput).fill(password);
  }
  async loginButton() {
    await this.page.locator(locators.loginButton).click();
  }

  async takeScreenshot(fileName) {
  const screenshotDir = path.join(__dirname, '../screenshots/login');

  fs.mkdirSync(screenshotDir, { recursive: true });

  await this.page.screenshot({
    path: path.join(screenshotDir, `${fileName}.png`),
    fullPage: true,
    });
  }
  async verifyUserAdded(firstName, lastName) {
    const userRow = await this.page.locator(`//div[@class='rt-tr-group']//div[contains(text(),'${firstName}')]//following-sibling::div[contains(text(),'${lastName}')]`);
    return await userRow.isVisible();
  }
}
module.exports = loginPage;