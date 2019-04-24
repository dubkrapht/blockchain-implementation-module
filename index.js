const Blockchain = require('./lib/Blockchain');

module.exports = {
  // initialize a new blockchain with transaction data
  init: (initialBalances, transactions, blockSize) => {
    const chain = new Blockchain(initialBalances);
    chain.addTransactions(transactions, blockSize);
    chain.processPendingTransactions();
    return chain;
  },
  // get balance for an address of a given chain
  getAccountBalances: (chain, address) => {
    return chain.getAccountBalances(address); 
  }
}
