const { test, expect } = require("@playwright/test");
const fs = require("node:fs");
const path = require("node:path");
const { parse } = require("csv-parse/sync");

const logoutPage = require("../pages/logoutpage");

const csvPath = path.join(__dirname, "../data/user.csv");

const users = parse(fs.readFileSync(csvPath, "utf8"), {
  columns: true,
  skip_empty_lines: true,
  trim: true,
});

test("Logout after login", async ({ page }) => {
  const user = users[0];
  expect(user, "The credentials CSV must contain at least one user").toBeTruthy();

  const login = new logoutPage(page);

  await login.open();
  await login.takeScreenshot("01-login-page");

  await login.inputUsername(user.username);
  await login.inputPassword(user.password);
  await login.takeScreenshot("02-credentials-filled");

  await login.loginButton();
  await expect(page).toHaveURL(/#appointment$/);
  await expect(page.getByRole("heading", { name: "Make Appointment" })).toBeVisible();

  await login.takeScreenshot("03-after-login");

  // Perform logout
  const logout = new logoutPage(page);
 
  await logout.logoutButton();
  await logout.takeScreenshot("04-logout-page");
  await page.getByRole('link', { name: 'Logout' }).click();
  await logout.takeScreenshot("05-after-logout");
});