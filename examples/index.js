const { init, getAccountBalances } = require('../');

// init chain

const chain = init([100, 100, 200], [[0, 1, 50], [1, 2, 30], [2, 1, 100]], 2)
const balance = getAccountBalances(chain, 2);
console.log(balance);