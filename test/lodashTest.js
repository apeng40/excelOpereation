var _ = require('lodash');

var strSortResult = _.sortBy('cda').join(' ');
console.log(strSortResult);

var arr = [
    {name: 'aa', age: 22, type: 'A', amount: 100},
    {name: 'bb', age: 23, type: 'A', amount: 110},
    {name: 'ab', age: 24, type: 'B', amount: 120},
    {name: 'cc', age: 23, type: 'A', amount: 130}
];

var filter = require('../filter/fieldFilter');
var fun = require('../filter/fieldFunction');
var result1 = _.groupBy(arr, 'type');
var result2=fun.calculateTotalByField(result1,'amount')
console.log('result:' + result1);

// var arrSortResult = _.sortBy(arr, function(item){
//     return item.name;
// })
//
//
// _.forEach(arrSortResult, function(item){
//     console.log(item.name);
// });

// var result=_.sortBy(arr, 'name');
// _.forEach(result, function(item){
//     console.log(item.name);
// });
//
// var a={};
//
// a['name']={'firstName':'huipeng','lastName':'wu'};
// console.log(JSON.stringify(a));