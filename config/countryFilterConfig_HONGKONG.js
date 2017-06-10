var dateFormat = require('dateformat');

var self = {
    filterLabel: 'Country (Descr)',
    country: "HONG KONG",
    inputPath: '../file/Daily Sales DB(20170519).xls',
    outputSheetName:'CN-Sheet',
    outputPath: '../file/output' + dateFormat(new Date(), "dddd_mmmm_dS_yyyy_H_MM_ss")+'.xlsx',
};

module.exports = self;