var dateFormat = require('dateformat');

var self = {
    countryLabel:'Country (Descr)',
    countryValue:'CHINA',
    dateLabel: 'Date (Id)',
    dateValue: "20170517",
    inputPath: '../file/Daily Sales DB(20170519).xls',
    outputSheetName:'CN-Amount',
    outputPath: '../file/Daily Report-' + dateFormat(new Date(), "dddd_mmmm_dS_yyyy_H_MM_ss")+'.xlsx',
};

module.exports = self;