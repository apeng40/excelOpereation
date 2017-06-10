var Promise = require('promise');
var excelUtil = require('../excelUtil');
var filter = require('../filter/fieldFilter');

var self = {
    // config: require('../config/countryFilterConfig'),
    config: require('../config/countryFilterConfig_HONGKONG'),
    outputSheetData: {},

    start: function () {
        self.readExcel(self.config.inputPath)
            .then(function (result) {
                result = excelUtil.getFirstSheet(result);
                self.outputSheetData.sheetName = self.config.outputSheetName;
                self.outputSheetData.header = result.header;
                self.outputSheetData.content = self.filterByCountry(result, self.config.filterLabel, self.config.country);
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

    filterByCountry: function (sourceData, label, countryName) {
        return filter.equalFilter(sourceData.content, label, countryName);
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