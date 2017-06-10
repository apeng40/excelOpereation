var excelUtil = require('../excelUtil');
var sheetName = 'sheet1';
var _headers = ['id', 'name', 'age', 'country', 'remark']
var _data = [{
    id: '1',
    name: 'test1',
    age: '30',
    country: 'China',
    remark: 'hello'
},
    {
        id: '2',
        name: 'test2',
        age: '20',
        country: 'America',
        remark: 'world'
    },
    {
        id: '3',
        name: 'test3',
        age: '18',
        country: 'Unkonw',
        remark: '???'
    }];

var sheetData = {};
sheetData['sheetName'] = sheetName;
sheetData['header'] = _headers;
sheetData['content'] = _data;

excelUtil.writeExcel(sheetData, './file/output.xlsx');