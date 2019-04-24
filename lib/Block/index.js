const crypto = require('crypto');

class Block {
  /**
   * Creates a new block instance
   * @param {Array} data 
   * @param {String} previousHash 
   */
  constructor(data, previousHash = '0') {
    this.timestamp = new Date();
    this.nonce = 0;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.generateHash();
  }

  /**
   * Generates a valid hash for this block instance
   */
  generateHash() {
    let hashData = `${this.previousHash} ${this.nonce} ${JSON.stringify(this.data)}`;
    let blockHash = crypto.createHash('sha1').update(hashData).digest('hex');
    while (!this.isHashValid(blockHash)) {
      this.nonce += 1;
      hashData = `${this.previousHash} ${this.nonce} ${JSON.stringify(this.data)}`;
      blockHash = crypto.createHash('sha1').update(hashData).digest('hex');
    }
    const blockData = `${blockHash} ${this.previousHash} ${this.nonce} ${JSON.stringify(this.data)}`;
    return crypto.createHash('sha256').update(blockData).digest('hex');
  }

  /**
   * Checks if a given hash is valid or not, as per requirements
   * @param {String} hash 
   */
  isHashValid(hash) {
    return hash.startsWith('1234');
  }
}

module.exports = Block;
