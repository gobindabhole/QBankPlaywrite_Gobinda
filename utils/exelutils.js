const XLSX = require("xlsx");

function readExcelFile(filepath, sheetName) {
  const workbook = XLSX.readFile(filepath);
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet);
  return data;
}

// const filepath =
//   "C:\\Users\\bhole\\OneDrive\\Documents\\Desktop\\QBankGit_Repo\\QBankPlaywrite_Gobinda\\testdata\\QbankTestDataSheet.xlsx";

// const jsonData = readExcelFile(filepath, "Credentials");
// console.log(jsonData);

export { readExcelFile };
