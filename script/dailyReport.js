var Promise = require('promise');
var excelUtil = require('../excelUtil');
var filter = require('../filter/fieldFilter');
var dailyReportCal = require('../business logic/dailyReport');

var self = {
    config: require('../config/dailyReportConfig'),
    outputSheetData: {},

    start: function () {
        var countryResult;
        var currentDayData, yesterdayData;
        self.readExcel(self.config.inputPath)
            .then(function (result) {
                result = excelUtil.getFirstSheet(result);
                self.outputSheetData.sheetName = self.config.outputSheetName;
                countryResult = filter.equalFilter(result.content, self.config.countryLabel, self.config.countryValue)
                currentDayData = filter.equalFilter(countryResult, self.config.dateLabel, parseInt(self.config.dateValue));
                yesterdayData = filter.equalFilter(countryResult, self.config.dateLabel, parseInt(self.config.dateV

                alue) - 1);
                var outputResult = dailyReportCal.dailyCompare(currentDayData, yesterdayData);
                self.outputSheetData.header = outputResult.header;
                self.outputSheetData.content = outputResult.content;
                return self.writeToExcel(self.outputSheetData, self.config.outputPath);
            })
            .then(function () {
                console.log('success!');
            })
            .catch(function (error) {
                console.log(error)
            })
    },

    readExcel: function (path) {
        return new Promise(function (resolve, reject) {
            excelUtil.readExcel(path)
                .then(function (result) {
                    resolve(result);
                })
                .catch(function (error) {
                    reject(error);
                })
        })
    },

    filter: function (sourceData, label, value) {
        return filter.equalFilter(sourceData.content, label, value);
    },

    writeToExcel: function (data, outputPath) {
        return new Promise(function (resolve, reject) {
            excelUtil.writeExcel(data, outputPath)
                .then(function () {
                    resolve();
                })
                .catch(function (error) {
                    reject(error);
                })
        })
    }
}

self.start();