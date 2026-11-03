const { test, expect } = require("@playwright/test");
const fs = require("node:fs");
const path = require("node:path");
const { parse } = require("csv-parse/sync");

const loginPage = require("../pages/loginpage");

const csvPath = path.join(__dirname, "../data/user.csv");

const users = parse(fs.readFileSync(csvPath, "utf8"), {
  columns: true,
  skip_empty_lines: true,
  trim: true,
});

// TCLogin01	User entering login page url
test("TCLogin01	User entering login page url", async ({ page }) => {
  const login = new loginPage(page);

  await login.open();
  await login.takeScreenshot("TCLogin01-login-page");

  await expect(page).toHaveURL(/#login$/);
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
});

// TCLogin02	User input valid username and password
test("TCLogin02	User input valid username and password", async ({ page }) => {
  const user = users[0];
  expect(user, "The credentials CSV must contain at least one user").toBeTruthy();

  const login = new loginPage(page);

  await login.open();
  await login.takeScreenshot("TCLogin02-login-page");

  await login.inputUsername(user.username);
  await login.inputPassword(user.password);
  await login.takeScreenshot("TCLogin02-credentials-filled");

  await login.loginButton();
  await expect(page).toHaveURL(/#appointment$/);
  await expect(page.getByRole("heading", { name: "Make Appointment" })).toBeVisible();

  await login.takeScreenshot("TCLogin02-after-login");
});

// TCLogin03	User input invalid username and password valid
test("TCLogin03	User input invalid username and password valid", async ({ page }) => {
  const user = users[1];
  expect(user, "The credentials CSV must contain at least two users").toBeTruthy();

  const login = new loginPage(page);

  await login.open();
  await login.takeScreenshot("TCLogin03-login-page");

  await login.inputUsername(user.username);
  await login.inputPassword(user.password);
  await login.takeScreenshot("TCLogin03-credentials-filled");
  await login.loginButton();

  await expect(page.getByText("Login failed! Please ensure the username and password are valid.")).toBeVisible();

  await login.takeScreenshot("TCLogin03-after-login");
});

// TCLogin04	User input valid username and password invalid
test("TCLogin04	User input valid username and password invalid", async ({ page }) => {
  const user = users[2];
  expect(user, "The credentials CSV must contain at least three users").toBeTruthy();

  const login = new loginPage(page);

  await login.open();
  await login.takeScreenshot("TCLogin04-login-page");

  await login.inputUsername(user.username);
  await login.inputPassword(user.password);
  await login.takeScreenshot("TCLogin04-credentials-filled");
  await login.loginButton();

  await expect(page.getByText("Login failed! Please ensure the username and password are valid.")).toBeVisible();

  await login.takeScreenshot("TCLogin04-after-login");
});
// TCLogin05	User input empty username and password valid
test("TCLogin05	User input empty username and password valid", async ({ page }) => {
  const user = users[3];
  expect(user, "The credentials CSV must contain at least four users").toBeTruthy();

  const login = new loginPage(page);

  await login.open();
  await login.takeScreenshot("TCLogin05-login-page");

  await login.inputUsername(user.username);
  await login.inputPassword(user.password);
  await login.takeScreenshot("TCLogin05-credentials-filled");
  await login.loginButton();

  await expect(page.getByText("Login failed! Please ensure the username and password are valid.")).toBeVisible();

  await login.takeScreenshot("TCLogin05-after-login");
});
// TCLogin06	User input valid username and empty password
test("TCLogin06	User input valid username and empty password", async ({ page }) => {
  const user = users[4];
  expect(user, "The credentials CSV must contain at least five users").toBeTruthy();

  const login = new loginPage(page);

  await login.open();
  await login.takeScreenshot("TCLogin06-login-page");

  await login.inputUsername(user.username);
  await login.inputPassword(user.password);
  await login.takeScreenshot("TCLogin06-credentials-filled");
  await login.loginButton();

  await expect(page.getByText("Login failed! Please ensure the username and password are valid.")).toBeVisible();

  await login.takeScreenshot("TCLogin06-after-login");
});
// TCLogin07	User input username and password empty
test("TCLogin07	User input username and password empty", async ({ page }) => {
  const login = new loginPage(page);

  await login.open();
  await login.takeScreenshot("TCLogin07-login-page");

  await login.inputUsername("");
  await login.inputPassword("");
  await login.takeScreenshot("TCLogin07-credentials-filled");
  await login.loginButton();

  await expect(page.getByText("Login failed! Please ensure the username and password are valid.")).toBeVisible();

  await login.takeScreenshot("TCLogin07-after-login");
});
// TCLogin08	User input username with number
// TCLogin09	User input username with sql query
// TCLogin10	User input username with script code
// TCLogin11	User input username with symbol
// TCLogin12	User input password with number
// TCLogin13	User input password with sql query
// TCLogin14	User input password with script code
// // TCLogin15	User input password with symbol
