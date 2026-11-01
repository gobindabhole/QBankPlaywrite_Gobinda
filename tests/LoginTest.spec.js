// @ts-check
import { test, expect } from "@playwright/test";
import { common } from "../utils/Commonutil";
import { readExcelFile } from "../utils/exelutils";
import { loginPage } from "../Pages/loginpage";
import { homepage } from "../Pages/HomePage";
const path = require("path");
const filepath = path.join(__dirname, "../testdata/QbankTestDataSheet.xlsx");

test("TC-1 Login and Logout of QBank application with correct Username and Password.", async ({
  page,
}) => {
  let commonclstest = new common(page);
  let loginpagetest = new loginPage(page);
  let homepagetest = new homepage(page);
  const username = readExcelFile(filepath, "Credentials")[0].username;
  console.log(username);
  const password = readExcelFile(filepath, "Credentials")[0].password;
  console.log(password);
  commonclstest.invoketheURL(page);
  await page.waitForTimeout(5000);
  loginpagetest.navigateToLHomePage(username, password);
  await page.waitForTimeout(5000);
  await expect(homepagetest.verifyhomepage()).toBeTruthy();
  await page.waitForTimeout(3000);
  await homepagetest.performLogout();
  await page.waitForTimeout(3000);
  await expect(loginpagetest.verifyLoginPage()).toBeTruthy();
  await page.waitForTimeout(3000);
});
test("TC-2 Login and Logout of QBank application with incorrect Username and Password.", async ({
  page,
}) => {
  let commonclstest = new common(page);
  let loginpagetest = new loginPage(page);
  let homepagetest = new homepage(page);
  const username = readExcelFile(filepath, "Credentials")[1].username;
  console.log(username);
  const password = readExcelFile(filepath, "Credentials")[1].password;
  console.log(password);
  await commonclstest.invoketheURL(page);
  await page.waitForTimeout(5000);
  await loginpagetest.navigateToLHomePage(username, password);
  await loginpagetest.btn_login.click();
  await loginpagetest.lblinvalidcredential.waitFor({ state: "visible" });
  await expect(loginpagetest.lblinvalidcredential.isVisible()).toBeTruthy();
  await page.waitForTimeout(2000);
  //
});
