// @ts-check

import { test, expect, chromium } from "@playwright/test";
import { common } from "../utils/Commonutil";
import { readExcelFile } from "../utils/exelutils";
import { loginPage } from "../Pages/loginpage";
import { homepage } from "../Pages/HomePage";
import { Branches } from "../Pages/Branches";
import { AccountsPage } from "../Pages/Accounts";
import { LinkCreditCard } from "../Pages/LinkCreditCard";
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

  loginpagetest.navigateToLHomePage(username, password);
  await homepagetest.lblwelcome.waitFor({ state: "visible" });

  await homepagetest.performLogout();
  await loginpagetest.btn_login.waitFor({ state: "visible" });
});
test("TC-2 Login and Logout of QBank application with incorrect Username and Password.", async ({
  page,
}) => {
  let commonclstest = new common(page);
  let loginpagetest = new loginPage(page);

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
test("TC-5 Search for Branches", async ({ page }) => {
  let commonclstest = new common(page);
  let loginpagetest = new loginPage(page);
  let BranchTest = new Branches(page);

  commonclstest.invoketheURL(page);

  await loginpagetest.navigateToSpicifiedNavbar("Branches");
  await BranchTest.lblHeaderinBranches.waitFor({ state: "visible" });
  var branchName = readExcelFile(filepath, "BranchSearch")[0].BranchName;
  var phNumebr = readExcelFile(filepath, "BranchSearch")[0].PhNo;
  await BranchTest.searchWithLocation(branchName);
  await BranchTest.secBankdetailes.waitFor({ state: "visible" });
  await expect(
    BranchTest.verifyThePhoneNumberWithBranch(phNumebr),
  ).toBeTruthy();
  var branchName = readExcelFile(filepath, "BranchSearch")[1].BranchName;
  var phNumebr = readExcelFile(filepath, "BranchSearch")[1].PhNo;
  await BranchTest.searchWithLocation(branchName);
  await BranchTest.secBankdetailes.waitFor({ state: "visible" });
  await expect(
    BranchTest.verifyThePhoneNumberWithBranch(phNumebr),
  ).toBeTruthy();
});
test("TC-6 Validate 'Link a Credit Card' functionality", async ({ page }) => {
  let commonclstest = new common(page);
  let loginpagetest = new loginPage(page);
  let homepagetest = new homepage(page);
  let LinkCreditcardtest = new LinkCreditCard(page);
  let Accountstest = new AccountsPage(page);
  const username = readExcelFile(filepath, "Credentials")[0].username;
  console.log(username);
  const password = readExcelFile(filepath, "Credentials")[0].password;
  console.log(password);

  commonclstest.invoketheURL(page);
  await loginpagetest.btn_login.waitFor({ state: "visible" });
  loginpagetest.navigateToLHomePage(username, password);
  await expect(homepagetest.verifyhomepage()).toBeTruthy();
  await Accountstest.navigateToSpecifiedActivity("Link a Credit Card");
  await LinkCreditcardtest.lblHeadingLinkCreditCard.waitFor({
    state: "visible",
  });
  let min = 1000000000000000n; // Smallest 16-digit number
  let max = 9999999999999999n; // Largest 16-digit number
  let randomBigInt =
    min + BigInt(Math.floor(Math.random() * Number(max - min)));
  let num = randomBigInt.toString();

  let CVV = "000";
  let date = "06/24";
  await LinkCreditcardtest.VerifyCreditCardWithCardDetailes(num, CVV, date);
  await page.waitForTimeout(3000);
  await LinkCreditcardtest.verifyTheInValidMsgappering();
  await LinkCreditcardtest.btn_Logout.click();
  await loginpagetest.btn_login.waitFor({ state: "visible" });
});
