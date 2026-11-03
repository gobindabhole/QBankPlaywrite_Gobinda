import { test, expect } from "@playwright/test";
import { common } from "../utils/Commonutil";
import { readExcelFile } from "../utils/exelutils";
import { loginPage } from "../Pages/loginpage";
import { homepage } from "../Pages/HomePage";
import { AccountsPage } from "../Pages/Accounts";
import { fundTransfer } from "../Pages/FundTransfer";
import { billpayment } from "../Pages/Billpayment";
import { AccountActivity } from "../Pages/AccountAcivity";
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

test("TC-4 Search in Account Activity Type", async ({ page }) => {
  let loginpagetest = new loginPage(page);
  let homepagetest = new homepage(page);
  let accountspagetest = new AccountsPage(page);
  let accountactivitypagetest = new AccountActivity(page);
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
  await accountspagetest.navigateToSpecifiedActivity("Account Activity");
  await accountactivitypagetest.lblHeaderAccountActivity.waitFor({
    state: "visible",
  });
  var TransactionType = readExcelFile(filepath, "AccountAcivity")[0]
    .Transaction_Type;
  var TransactionStatus = readExcelFile(filepath, "AccountAcivity")[0]
    .Transaction_Status;
  var TransactionDate = readExcelFile(filepath, "AccountAcivity")[0]
    .Transaction_date;
  if (TransactionDate === "Current date") {
    const today = new Date();

    TransactionDate =
      today.getFullYear() +
      "-" +
      String(today.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(today.getDate()).padStart(2, "0");
  }
  var TransactionAccount = readExcelFile(filepath, "AccountAcivity")[0]
    .Transaction_Account;
  var MinTransactionAmount = readExcelFile(
    filepath,
    "AccountAcivity",
  )[0].Mintransaction_Amount.toString();
  var MaxTransactionAmount = readExcelFile(
    filepath,
    "AccountAcivity",
  )[0].Maxtransaction_Amount.toString();
  await accountactivitypagetest.filteringtheTransaction(
    TransactionType,
    TransactionStatus,
    TransactionDate,
    TransactionAccount,
    MinTransactionAmount,
    MaxTransactionAmount,
  );
  await page.waitForTimeout(2000);

  const transactionCount =
    await accountactivitypagetest.getTheNumberOfTransactions();
  console.log(`Number of transactions found: ${transactionCount}`);
  await expect(transactionCount).toBeGreaterThan(0);
  await accountactivitypagetest.btnLogout.click();
  await loginpagetest.btn_login.waitFor({ state: "visible" });
});
