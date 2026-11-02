import { test, expect } from "@playwright/test";
import { common } from "../utils/Commonutil";
import { readExcelFile } from "../utils/exelutils";
import { loginPage } from "../Pages/loginpage";
import { homepage } from "../Pages/HomePage";
import { AccountsPage } from "../Pages/Accounts";
import { fundTransfer } from "../Pages/FundTransfer";
import { billpayment } from "../Pages/Billpayment";
const path = require("path");
const filepath = path.join(__dirname, "../testdata/QbankTestDataSheet.xlsx");

test("TC-2 Verify Funds Transfer Initiation Process.", async ({ page }) => {
  let commonclstest = new common(page);
  let loginpagetest = new loginPage(page);
  let homepagetest = new homepage(page);
  let accountspagetest = new AccountsPage(page);
  let fundtransferpagetest = new fundTransfer(page);
  const username = readExcelFile(filepath, "Credentials")[0].username;
  console.log(username);
  const password = readExcelFile(filepath, "Credentials")[0].password;
  console.log(password);
  var transferfrom = readExcelFile(filepath, "Transfer fund")[0].Transferfrom;
  console.log(transferfrom);
  var TransferTo = readExcelFile(filepath, "Transfer fund")[0].TransferTo;
  console.log(TransferTo);
  var Amount = readExcelFile(filepath, "Transfer fund")[0].Amount.toString();
  console.log(Amount);
  var Dateoftransfer = readExcelFile(filepath, "Transfer fund")[0]
    .Dateoftransfer;
  console.log(Dateoftransfer);
  var Memo = readExcelFile(filepath, "Transfer fund")[0].Memo;
  var Onetimeorrepeating = readExcelFile(filepath, "Transfer fund")[0]
    .Onetimeorrepeating;

  commonclstest.invoketheURL(page);
  await page.waitForTimeout(4000);
  loginpagetest.navigateToLHomePage(username, password);
  await homepagetest.lblwelcome.waitFor({ state: "visible" });
  await expect(homepagetest.verifyhomepage()).toBeTruthy();

  await accountspagetest.navigateToSpecifiedActivity("Fund Transfer");

  await fundtransferpagetest.lblTransferFunds.waitFor({ state: "visible" });

  await fundtransferpagetest.submitingFundTransfer(
    transferfrom,
    TransferTo,
    Amount,
    Dateoftransfer,
    Memo,
    Onetimeorrepeating,
  );

  await fundtransferpagetest.lblConfirmation.waitFor({ state: "visible" });

  //   await page.waitForTimeout(3000);

  await expect(
    fundtransferpagetest.verifyTheDetailsOfFundTransferWithConfirmation(
      transferfrom,
      TransferTo,
      Amount,
    ),
  ).toBeTruthy();

  homepagetest.performLogout();
  loginpagetest.btn_login.waitFor({ state: "visible" });
  await page.waitForTimeout(2000);
});
test("TC-3 Verify the Bill Payment intiation Process", async ({ page }) => {
  let loginpagetest = new loginPage(page);
  let homepagetest = new homepage(page);
  let accountspagetest = new AccountsPage(page);
  let billpaymentpagetest = new billpayment(page);
  let commonclstest = new common(page);
  const username = readExcelFile(filepath, "Credentials")[0].username;
  console.log(username);
  const password = readExcelFile(filepath, "Credentials")[0].password;
  console.log(password);
  commonclstest.invoketheURL(page);
  await page.waitForTimeout(4000);
  await loginpagetest.navigateToLHomePage(username, password);
  await homepagetest.lblwelcome.waitFor({ state: "visible" });
  await expect(homepagetest.verifyhomepage()).toBeTruthy();
  await accountspagetest.navigateToSpecifiedActivity("Bill Payments");
  await billpaymentpagetest.lblHeaderBillpayment.waitFor({ state: "visible" });
  var TransferFrom = readExcelFile(filepath, "BillPayment")[0].Transferfrom;
  var BillType = readExcelFile(filepath, "BillPayment")[0].Billtype;
  var TransactionDate = readExcelFile(filepath, "BillPayment")[0].date;
  var Amount = readExcelFile(filepath, "BillPayment")[0].Amount.toString();
  await billpaymentpagetest.submitingBillpayment(
    TransferFrom,
    BillType,
    TransactionDate,
    Amount,
  );
  await homepagetest.lblwelcome.waitFor({ state: "visible" });
  await expect(homepagetest.verifyhomepage()).toBeTruthy();
  await homepagetest.performLogout();
  await loginpagetest.btn_login.waitFor({ state: "visible" });
  await page.waitForTimeout(2000);
});
