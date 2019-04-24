const Block = require('../Block');
class Blockchain {
  /**
   * Creates a new Blockchain instance
   * Initializes an array of accounts that hold initial balances
   * Initializes a genesis block
   * @param {Array} initialBalances 
   */
  constructor(initialBalances) {
    this.pendingTransactions = [];
    this.chain = [this.createFirstBlock()];
    this.accounts = initialBalances;
  }

  getAllAccounts() {
    return this.accounts;
  }

  getAccountBalances(address) {
    return this.accounts[address];
  }

  createFirstBlock() {
    return new Block([]);
  }

  getLastBlock() {
    return this.chain[this.chain.length -1];
  }
  /**
   * Validates and adds incoming transactions to be processed
   * @param {Array} transactions 
   * @param {Number} blockSize 
   */
  addTransactions(transactions, blockSize) {
    // this temporary array will serve to check against an account
    // for each iteration of transactions, but without changing the
    // original amounts
    const accountsTmp = Object.assign([], this.accounts);
    let validTransactions = 0;
    transactions.forEach((transaction) => {
      // check against length of 3 since a transactions is
      // represented as an array of 3 values [from, to, amount]
      if (transaction.length !== 3) {
        throw new Error('Transaction data are not present');
      }
      if (!(accountsTmp[transaction[0]] >= transaction[2])) {
        return;
      }
      // in case we still have a valid transaction but we have
      // completed the required block size
      if (validTransactions >= blockSize) {
        return;
      }
      accountsTmp[transaction[0]] -= transaction[2];
      accountsTmp[transaction[1]] += transaction[2];
      validTransactions += 1;
      this.pendingTransactions.push(transaction);
    });
  }
  /**
   * Processes pending transactions by modifying accounts
   * Creates a new block in the chain with transactional data
   */
  processPendingTransactions() {
    this.pendingTransactions.forEach((transaction) => {
      this.accounts[transaction[0]] -= transaction[2];
      this.accounts[transaction[1]] += transaction[2];
    });
    const block = new Block(this.pendingTransactions, this.getLastBlock().hash);
    this.chain.push(block);
    this.pendingTransactions = [];
  }
}

module.exports = Blockchain;
