const { test, expect } = require("@playwright/test");
const fs = require("node:fs");
const path = require("node:path");
const { parse } = require("csv-parse/sync");

const makeAppoinment = require("../pages/makeappoinmentpage");

const dataAppoinment = path.join(__dirname, "../data/makeappoinment.csv");
const user = path.join(__dirname, "../data/user.csv");

const users = parse(fs.readFileSync(user, "utf8"), {
  columns: true,
  skip_empty_lines: true,
  trim: true,
});

const appointments = parse(fs.readFileSync(dataAppoinment, "utf8"), {
  columns: true,
  skip_empty_lines: true,
  trim: true,
});

// User make an appoinment without login
test("TCMakeAppointment01	User make an appoinment without login", async ({ page }) => {
  const makeAppointment = new makeAppoinment(page);
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  await makeAppointment.takeScreenshot("TCMakeAppointment01-home-page");
  
  await makeAppointment.btnmakeappoinment();
  await expect(page).toHaveURL(/#login$/);
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  await makeAppointment.takeScreenshot("TCMakeAppointment01-login-page");
});

// User make an appoinment with facility Tokyo CURA Healthcare Center
test("TCMakeAppointment02	User make an appoinment with facility Tokyo CURA Healthcare Center", async ({ page }) => {
  const makeAppointment = new makeAppoinment(page);
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  await makeAppointment.takeScreenshot("TCMakeAppointment02-home-page");
  
  await makeAppointment.btnmakeappoinment();
  await expect(page).toHaveURL(/#login$/);
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  await makeAppointment.takeScreenshot("TCMakeAppointment02-login-page");
  
  // Login with valid credentials
  await makeAppointment.inputUsername(users[0].username);
  await makeAppointment.inputPassword(users[0].password);
  await makeAppointment.loginButton();
  await expect(page).toHaveURL(/#appointment$/);
  await expect(page.getByRole("heading", { name: "Make Appointment" })).toBeVisible();
  await makeAppointment.takeScreenshot("TCMakeAppointment02-make-appointment-page");
  
  // Make an appointment with facility Tokyo CURA Healthcare Center
  await makeAppointment.selectFacility("Tokyo CURA Healthcare Center");
  await makeAppointment.checkHospitalReadmission();
  await makeAppointment.selectHealthcareProgram("Medicare");
  await makeAppointment.inputVisitDate(appointments[0].visitDate);
  await makeAppointment.inputComment(appointments[0].comment);

  await makeAppointment.bookAppointment();
  await expect(page).toHaveURL(/#summary$/);
  await expect(page.getByRole("heading", { name: "Appointment Confirmation" })).toBeVisible();
  await expect(page.locator("#facility")).toHaveText("Tokyo CURA Healthcare Center");
  await expect(page.locator("#hospital_readmission")).toHaveText("Yes");
  await expect(page.locator("#program")).toHaveText("Medicare");
  await expect(page.locator("#visit_date")).toHaveText(appointments[0].visitDate);
  await expect(page.locator("#comment")).toHaveText(appointments[0].comment);
  await makeAppointment.takeScreenshot("TCMakeAppointment02-appointment-confirmation-page");
});

// User make an appoinment with facility Hongkong CURA Healthcare Center
test("TCMakeAppointment03	User make an appoinment with facility Hongkong CURA Healthcare Center", async ({ page }) => {
  const makeAppointment = new makeAppoinment(page);
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  await makeAppointment.takeScreenshot("TCMakeAppointment03-home-page");
  
  await makeAppointment.btnmakeappoinment();
  await expect(page).toHaveURL(/#login$/);
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  await makeAppointment.takeScreenshot("TCMakeAppointment03-login-page");
  
  // Login with valid credentials
  await makeAppointment.inputUsername(users[0].username);
  await makeAppointment.inputPassword(users[0].password);
  await makeAppointment.loginButton();
  await expect(page).toHaveURL(/#appointment$/);
  await expect(page.getByRole("heading", { name: "Make Appointment" })).toBeVisible();
  await makeAppointment.takeScreenshot("TCMakeAppointment03-make-appointment-page");
  
  // Make an appointment with facility Hongkong CURA Healthcare Center
  await makeAppointment.selectFacility("Hongkong CURA Healthcare Center");
  await makeAppointment.checkHospitalReadmission();
  await makeAppointment.selectHealthcareProgram("Medicaid");
  await makeAppointment.inputVisitDate(appointments[1].visitDate);
  await makeAppointment.inputComment(appointments[1].comment);

  await makeAppointment.bookAppointment();
  await expect(page).toHaveURL(/#summary$/);
  await expect(page.getByRole("heading", { name: "Appointment Confirmation" })).toBeVisible();
  await expect(page.locator("#facility")).toHaveText("Hongkong CURA Healthcare Center");
  await expect(page.locator("#hospital_readmission")).toHaveText("Yes");
  await expect(page.locator("#program")).toHaveText("Medicaid");
  await expect(page.locator("#visit_date")).toHaveText(appointments[1].visitDate);
  await expect(page.locator("#comment")).toHaveText(appointments[1].comment);
  await makeAppointment.takeScreenshot("TCMakeAppointment03-appointment-confirmation-page");
});
// User make an appoinment with facility Seoul CURA Healthcare Center
test("TCMakeAppointment04	User make an appoinment with facility Seoul CURA Healthcare Center", async ({ page }) => {
  const makeAppointment = new makeAppoinment(page);
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  await makeAppointment.takeScreenshot("TCMakeAppointment04-home-page");
  
  await makeAppointment.btnmakeappoinment();
  await expect(page).toHaveURL(/#login$/);
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  await makeAppointment.takeScreenshot("TCMakeAppointment04-login-page");
  
  // Login with valid credentials
  await makeAppointment.inputUsername(users[0].username);
  await makeAppointment.inputPassword(users[0].password);
  await makeAppointment.loginButton();
  await expect(page).toHaveURL(/#appointment$/);
  await expect(page.getByRole("heading", { name: "Make Appointment" })).toBeVisible();
  await makeAppointment.takeScreenshot("TCMakeAppointment04-make-appointment-page");
  
  // Make an appointment with facility Seoul CURA Healthcare Center
  await makeAppointment.selectFacility("Seoul CURA Healthcare Center");
  await makeAppointment.checkHospitalReadmission();
  await makeAppointment.selectHealthcareProgram("None");
  await makeAppointment.inputVisitDate(appointments[2].visitDate);
  await makeAppointment.inputComment(appointments[2].comment);

  await makeAppointment.bookAppointment();
  await expect(page).toHaveURL(/#summary$/);
  await expect(page.getByRole("heading", { name: "Appointment Confirmation" })).toBeVisible();
  await expect(page.locator("#facility")).toHaveText("Seoul CURA Healthcare Center");
  await expect(page.locator("#hospital_readmission")).toHaveText("Yes");
  await expect(page.locator("#program")).toHaveText("None");
  await expect(page.locator("#visit_date")).toHaveText(appointments[2].visitDate);
  await expect(page.locator("#comment")).toHaveText(appointments[2].comment);
  await makeAppointment.takeScreenshot("TCMakeAppointment04-appointment-confirmation-page");
});
// User make an appoinment without Apply for hospital readmission
test("TCMakeAppointment05	User make an appoinment without Apply for hospital readmission", async ({ page }) => {
  const makeAppointment = new makeAppoinment(page);
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  await makeAppointment.takeScreenshot("TCMakeAppointment05-home-page");
  
  await makeAppointment.btnmakeappoinment();
  await expect(page).toHaveURL(/#login$/);
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  await makeAppointment.takeScreenshot("TCMakeAppointment05-login-page");
  
  // Login with valid credentials
  await makeAppointment.inputUsername(users[0].username);
  await makeAppointment.inputPassword(users[0].password);
  await makeAppointment.loginButton();
  await expect(page).toHaveURL(/#appointment$/);
  await expect(page.getByRole("heading", { name: "Make Appointment" })).toBeVisible();
  await makeAppointment.takeScreenshot("TCMakeAppointment05-make-appointment-page");
  
  // Make an appointment without Apply for hospital readmission
  await makeAppointment.selectFacility("Tokyo CURA Healthcare Center");
  await makeAppointment.selectHealthcareProgram("Medicare");
  await makeAppointment.inputVisitDate(appointments[3].visitDate);
  await makeAppointment.inputComment(appointments[3].comment);

  await makeAppointment.bookAppointment();
  await expect(page).toHaveURL(/#summary$/);
  await expect(page.getByRole("heading", { name: "Appointment Confirmation" })).toBeVisible();
  await expect(page.locator("#facility")).toHaveText("Tokyo CURA Healthcare Center");
  await expect(page.locator("#hospital_readmission")).toHaveText("No");
  await expect(page.locator("#program")).toHaveText("Medicare");
  await expect(page.locator("#visit_date")).toHaveText(appointments[3].visitDate);
  await expect(page.locator("#comment")).toHaveText(appointments[3].comment);
  await makeAppointment.takeScreenshot("TCMakeAppointment05-appointment-confirmation-page");
});
// User make an appointment with Healthcare Program Medicare
test("TCMakeAppointment06	User make an appointment with Healthcare Program Medicare", async ({ page }) => {
  const makeAppointment = new makeAppoinment(page);
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  await makeAppointment.takeScreenshot("TCMakeAppointment06-home-page");
  
  await makeAppointment.btnmakeappoinment();
  await expect(page).toHaveURL(/#login$/);
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  await makeAppointment.takeScreenshot("TCMakeAppointment06-login-page");
  
  // Login with valid credentials
  await makeAppointment.inputUsername(users[0].username);
  await makeAppointment.inputPassword(users[0].password);
  await makeAppointment.loginButton();
  await expect(page).toHaveURL(/#appointment$/);
  await expect(page.getByRole("heading", { name: "Make Appointment" })).toBeVisible();
  await makeAppointment.takeScreenshot("TCMakeAppointment06-make-appointment-page");
  
  // Make an appointment with Healthcare Program Medicare
  await makeAppointment.selectFacility("Seoul CURA Healthcare Center");
  await makeAppointment.checkHospitalReadmission();
  await makeAppointment.selectHealthcareProgram("Medicare");
  await makeAppointment.inputVisitDate(appointments[4].visitDate);
  await makeAppointment.inputComment(appointments[4].comment);

  await makeAppointment.bookAppointment();
  await expect(page).toHaveURL(/#summary$/);
  await expect(page.getByRole("heading", { name: "Appointment Confirmation" })).toBeVisible();
  await expect(page.locator("#facility")).toHaveText("Seoul CURA Healthcare Center");
  await expect(page.locator("#hospital_readmission")).toHaveText("Yes");
  await expect(page.locator("#program")).toHaveText("Medicare");
  await expect(page.locator("#visit_date")).toHaveText(appointments[4].visitDate);
  await expect(page.locator("#comment")).toHaveText(appointments[4].comment);
  await makeAppointment.takeScreenshot("TCMakeAppointment06-appointment-confirmation-page");
});
// User make an appointment with Healthcare Program Medicaid
test("TCMakeAppointment07	User make an appointment with Healthcare Program Medicaid", async ({ page }) => {
  const makeAppointment = new makeAppoinment(page);
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  await makeAppointment.takeScreenshot("TCMakeAppointment07-home-page");
  
  await makeAppointment.btnmakeappoinment();
  await expect(page).toHaveURL(/#login$/);
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  await makeAppointment.takeScreenshot("TCMakeAppointment07-login-page");
  
  // Login with valid credentials
  await makeAppointment.inputUsername(users[0].username);
  await makeAppointment.inputPassword(users[0].password);
  await makeAppointment.loginButton();
  await expect(page).toHaveURL(/#appointment$/);
  await expect(page.getByRole("heading", { name: "Make Appointment" })).toBeVisible();
  await makeAppointment.takeScreenshot("TCMakeAppointment07-make-appointment-page");
  
  // Make an appointment with Healthcare Program Medicaid
  await makeAppointment.selectFacility("Hongkong CURA Healthcare Center");
  await makeAppointment.checkHospitalReadmission();
  await makeAppointment.selectHealthcareProgram("Medicaid");
  await makeAppointment.inputVisitDate(appointments[5].visitDate);
  await makeAppointment.inputComment(appointments[5].comment);

  await makeAppointment.bookAppointment();
  await expect(page).toHaveURL(/#summary$/);
  await expect(page.getByRole("heading", { name: "Appointment Confirmation" })).toBeVisible();
  await expect(page.locator("#facility")).toHaveText("Hongkong CURA Healthcare Center");
  await expect(page.locator("#hospital_readmission")).toHaveText("Yes");
  await expect(page.locator("#program")).toHaveText("Medicaid");
  await expect(page.locator("#visit_date")).toHaveText(appointments[5].visitDate);
  await expect(page.locator("#comment")).toHaveText(appointments[5].comment);
  await makeAppointment.takeScreenshot("TCMakeAppointment07-appointment-confirmation-page");
});
// User make an appointment with Healthcare Program None
test("TCMakeAppointment08	User make an appointment with Healthcare Program None", async ({ page }) => {
  const makeAppointment = new makeAppoinment(page);
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  await makeAppointment.takeScreenshot("TCMakeAppointment08-home-page");
  
  await makeAppointment.btnmakeappoinment();
  await expect(page).toHaveURL(/#login$/);
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  await makeAppointment.takeScreenshot("TCMakeAppointment08-login-page");
  
  // Login with valid credentials
  await makeAppointment.inputUsername(users[0].username);
  await makeAppointment.inputPassword(users[0].password);
  await makeAppointment.loginButton();
  await expect(page).toHaveURL(/#appointment$/);
  await expect(page.getByRole("heading", { name: "Make Appointment" })).toBeVisible();
  await makeAppointment.takeScreenshot("TCMakeAppointment08-make-appointment-page");
  
  // Make an appointment with Healthcare Program None
  await makeAppointment.selectFacility("Tokyo CURA Healthcare Center");
  await makeAppointment.checkHospitalReadmission();
  await makeAppointment.selectHealthcareProgram("None");
  await makeAppointment.inputVisitDate(appointments[6].visitDate);
  await makeAppointment.inputComment(appointments[6].comment);
  await makeAppointment.bookAppointment();
  await expect(page).toHaveURL(/#summary$/);
  await expect(page.getByRole("heading", { name: "Appointment Confirmation" })).toBeVisible();
  await expect(page.locator("#facility")).toHaveText("Tokyo CURA Healthcare Center");
  await expect(page.locator("#hospital_readmission")).toHaveText("Yes");
  await expect(page.locator("#program")).toHaveText("None");
  await expect(page.locator("#visit_date")).toHaveText(appointments[6].visitDate);
  await expect(page.locator("#comment")).toHaveText(appointments[6].comment);
  await makeAppointment.takeScreenshot("TCMakeAppointment08-appointment-confirmation-page");
});
// User make an appointment without visit date
test("TCMakeAppointment09	User make an appointment without visit date", async ({ page }) => {
  const makeAppointment = new makeAppoinment(page);
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  await makeAppointment.takeScreenshot("TCMakeAppointment09-home-page");
  await makeAppointment.btnmakeappoinment();
  await expect(page).toHaveURL(/#login$/);
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  await makeAppointment.takeScreenshot("TCMakeAppointment09-login-page");
  // Login with valid credentials
  await makeAppointment.inputUsername(users[0].username);
  await makeAppointment.inputPassword(users[0].password);
  await makeAppointment.loginButton();
  await expect(page).toHaveURL(/#appointment$/);
  await expect(page.getByRole("heading", { name: "Make Appointment" })).toBeVisible();
  await makeAppointment.takeScreenshot("TCMakeAppointment09-make-appointment-page");
  // Make an appointment without visit date
  await makeAppointment.selectFacility("Seoul CURA Healthcare Center");
  await makeAppointment.checkHospitalReadmission();
  await makeAppointment.selectHealthcareProgram("Medicare");
  await makeAppointment.inputComment(appointments[6].comment);
  await makeAppointment.bookAppointment();
  await page.waitForTimeout(2000); // Add a delay to allow the page to update
  await expect(page).toHaveURL(/#appointment$/);
  await expect(page.getByRole("heading", { name: "Make Appointment" })).toBeVisible();
  await makeAppointment.takeScreenshot("TCMakeAppointment09-make-appointment-error-page");
});