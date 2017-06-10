var excelUtil=require('./excelUtil');
var result=excelUtil.readExcel('file/testStartColumn.xlsx');
var firstSheet=excelUtil.getFirstSheet(result);
//sync to read xls file
var workbook = xlsx.readFileSync('file/Daily Sales DB(20170519).xls');

var sheetNames = workbook.SheetNames;
var worksheet = workbook.Sheets[sheetNames[0]];

console.log("A2: " + worksheet['A2']['w']);