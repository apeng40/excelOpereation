var Promise = require('promise');
var fs = require('fs');
var xlsx = require('xlsx');
var _ = require('lodash');

var self = {
    readExcel: function (path) {
        return new Promise(function (resolve, reject) {
            try {
                var workbook = xlsx.readFileSync(path), result = [];
                workbook.SheetNames.forEach(function (name) {
                    var sheet = workbook.Sheets[name];
                    var range = xlsx.utils.decode_range(sheet['!ref']);
                    var row_start = range.s.r, row_end = range.e.r;
                    var col_start = range.s.c, col_end = range.e.c;
                    var sheetResult = {}, header = [], content = [];
                    var row_data;
                    for (var i = col_start; i <= col_end; i++) {
                        var addr = xlsx.utils.encode_col(i) + xlsx.utils.encode_row(row_start);
                        header.push(sheet[addr].v);
                    }
                    row_start++;
                    for (; row_start <= row_end; row_start++) {
                        row_data = {};
                        for (var i = col_start, j = 0; i <= col_end; i++, j++) {
                            var addr = xlsx.utils.encode_col(i) + xlsx.utils.encode_row(row_start);
                            var cell = sheet[addr];
                            if (cell.l) {
                                row_data[header[j]] = ({text: cell.v, link: cell.l.Target});
                            } else {
                                row_data[header[j]] = cell.v;
                            }
                        }
                        content.push(row_data);
                    }
                    ;
                    sheetResult['name'] = name;
                    sheetResult['header'] = header;
                    sheetResult['content'] = content;
                    result.push(sheetResult);
                });
                resolve(result);
            } catch (error) {
                reject('error occured during read excel, specific error is: ' + error);
            }
        })
    },

    //not use only when the header of exported excel is defined by us, not use the original excel header
    sheetToJson: function (path) {
        var workbook = xlsx.readFileSync(path), result = [];
        workbook.SheetNames.forEach(function (sheetName) {
            var worksheet = workbook.Sheets[sheetName];
            result[sheetName] = xlsx.utils.sheet_to_json(worksheet);
        });
        return result;
    },

    /**
     *
     * @param data  ----Should include such information: header(array),content(array of object),sheetName
     * @param outputPath
     */
    writeExcel: function (sheetData, outputPath) {
        return new Promise(function (resolve, reject) {
            try {
                var _headers = sheetData.header;
                var _data = sheetData.content;
                var headers = _headers.map((v, i) => Object.assign({}, {
                        v: v,
                        position: String.fromCharCode(65 + i) + 1
                    })
                ).reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});

                var data = _data.map((v, i) => _headers.map((k, j) => Object.assign({}, {
                        v: v[k],
                        position: String.fromCharCode(65 + j) + (i + 2)
                    })
                )).reduce((prev, next) => prev.concat(next)
                ).reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {}
                );
                var output = Object.assign({}, headers, data);
                var outputPos = Object.keys(output);
                var ref = outputPos[0] + ':' + outputPos[outputPos.length - 1];

                var Sheets = {};
                Sheets[sheetData.sheetName] = Object.assign({}, output, {'!ref': ref});
                var wb = {
                    SheetNames: [sheetData.sheetName],
                    Sheets
                };
                xlsx.writeFile(wb, outputPath);
                resolve();
            } catch (error) {
                reject('error occured during write excel, specific error is: ' + error)
            }
        })
    },

    getFirstSheet: function (sheets) {
        return sheets[0];
    },

    getSheetByName: function (sheets, sheetName) {
        return new Promise(function (resolve, reject) {
            var sheet = _.filter(sheets, {name: sheetName});
            if (sheet.size = 0) {
                reject('no sheet find by name: ' + sheetName);
            } else {
                resolve(sheet);
            }
        })
    }
};

module.exports = self;