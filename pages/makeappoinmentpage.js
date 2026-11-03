const locators = require("../locators/loginlogout");
const locatorsMakeAppointment = require("../locators/makeappoinment");
const fs = require("node:fs");
const path = require("node:path");

class makeAppointmentPage {
  constructor(page) {
    this.page = page;
  }
  async open() {
    await this.page.goto(
      "https://katalon-demo-cura.herokuapp.com/profile.php#login",
    );
  }
  async inputUsername(username) {
    await this.page.locator(locators.login.usernameInput).fill(username);
  }
  async inputPassword(password) {
    await this.page.locator(locators.login.passwordInput).fill(password);
  }
  async loginButton() {
    await this.page.locator(locators.login.loginButton).click();
  }

  async btnmakeappoinment() {
    await this.page
      .locator(locatorsMakeAppointment.makeAppointment.btnMakeAppointment)
      .click();
  }

  async selectFacility(facility) {
    await this.page
      .locator(locatorsMakeAppointment.makeAppointment.facilityDropdown)
      .selectOption(facility);
  }

  async checkHospitalReadmission() {
    await this.page
      .locator(
        locatorsMakeAppointment.makeAppointment.hospitalReadmissionCheckbox,
      )
      .check();
  }

  async selectHealthcareProgram(program) {
    await this.page
      .locator(
        `${locatorsMakeAppointment.makeAppointment.healthcareProgramRadio}[value="${program}"]`,
      )
      .check();
  }

  async inputVisitDate(date) {
    const targetInput = this.page.locator(
      locatorsMakeAppointment.makeAppointment.visitDateInput,
    );

    await targetInput.click();
    await targetInput.clear();
    await targetInput.pressSequentially(date, { delay: 100 });
    await this.page.keyboard.press("Escape");
  }

  async inputComment(comment) {
    await this.page
      .locator(locatorsMakeAppointment.makeAppointment.commentTextarea)
      .fill(comment);
  }

  async bookAppointment() {
    await this.page
      .locator(locatorsMakeAppointment.makeAppointment.bookAppointmentButton)
      .click();
  }

  async takeScreenshot(fileName) {
    const screenshotDir = path.join(
      __dirname,
      "../screenshots/make-appointment",
    );

    fs.mkdirSync(screenshotDir, { recursive: true });

    await this.page.screenshot({
      path: path.join(screenshotDir, `${fileName}.png`),
      fullPage: true,
    });
  }
  async verifyUserAdded(firstName, lastName) {
    const userRow = await this.page.locator(
      `//div[@class='rt-tr-group']//div[contains(text(),'${firstName}')]//following-sibling::div[contains(text(),'${lastName}')]`,
    );
    return await userRow.isVisible();
  }
}
module.exports = makeAppointmentPage;
