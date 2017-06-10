var _ = require('lodash');

var self = {
    groupBy: function (data, field) {
        return _.groupBy(data, field);
    },

    sortBy: function (data, field) {
        var result = _.sortBy(data, function (item) {
            return -item[field];
        });
        return result;
    },

    /**
     * data must be array and the field of data must be number otherwise, it will cause the inaccurate of the result, and this function will not throw exception
     * @param data
     * @param field
     */
    calculateTotalByField: function (data, field) {
        var result = {};
        for (var item in data) {
            var sum = 0;
            data[item].forEach(function (value, index, arr) {
                sum = sum + parseInt(value[field]);
            })
            result[item] = {total: sum};
        }
        return result;
    }
}

module.exports = self;