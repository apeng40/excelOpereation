var _ = require('lodash');

var self = {
    equalFilter: function (data, fieldName, fieldValue) {
        var obj = {};
        obj[fieldName] = fieldValue;
        var result = _.filter(data, obj);
        return result;
    },

    lessThanFilter:function (data, fieldNmae, fieldValue) {
        var obj = {};
        obj[fieldName] = fieldValue;
        var result = _.filter(data, obj);
        return result;
    },

    greaterThanFilter:function (data, fieldNmae, fieldValue) {
        var obj = {};
        obj[fieldName] = fieldValue;
        var result = _.filter(data, obj);
        return result;
    }
}

module.exports = self;