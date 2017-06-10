var fun = require('../filter/fieldFunction');

var self = {
    header: ['项目', '当日销售', '昨日', '环比'],
    sortBy: 'Store (Id)',
    calculatedField: 'Sold Amount (Local) (Net Discount Net Tax)',

    dailyCompare: function (currentDayData, yesterdayData) {
        var result = {};
        var resultContent = [];
        currentDayData = fun.groupBy(currentDayData, self.sortBy);
        yesterdayData = fun.groupBy(yesterdayData, self.sortBy);
        var currentDayCalculatedData = fun.calculateTotalByField(currentDayData, self.calculatedField);
        var yesterdayCalculatedData = fun.calculateTotalByField(yesterdayData, self.calculatedField);
        for (var item in currentDayCalculatedData) {
            var row = {};
            row['项目'] = item;
            row['当日销售'] = currentDayCalculatedData[item].total;
            row['昨日'] = yesterdayCalculatedData[item].total;
            row['环比'] = parseFloat((currentDayCalculatedData[item].total - yesterdayCalculatedData[item].total) / yesterdayCalculatedData[item].total);
            resultContent.push(row);
        }
        result['header'] = self.header;
        result['content'] = fun.sortBy(resultContent, '环比');
        return result;
    }
}

module.exports = self;