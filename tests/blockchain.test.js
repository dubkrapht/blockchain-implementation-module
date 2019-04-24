const { expect } = require('chai');

const Block = require('../lib/Block');
const Blockchain = require('../lib/Blockchain');
let mockBlockchain = {};
const mockInitialBalances = [100, 100, 200];

describe('Testing Blockchain', () => {
  before(() => {
    mockBlockchain = new Blockchain(mockInitialBalances);
  });
  describe('on new instance', () => {
    it('should be an instance of Blockchain', () => {
      expect(mockBlockchain).to.be.an.instanceOf(Blockchain);
    });
    it('should have created genesis block', () => {
      expect(mockBlockchain.chain).to.exist;
      expect(mockBlockchain.chain).to.have.length(1);
    });
    it('should have created initial balances', () => {
      expect(mockBlockchain.accounts).to.eql(mockInitialBalances);
    })
  });
  describe('on new transaction with invalid transactional data', () => {
    const missingTrxData = [[1, 2]];
    it('should throw an error', () => {
      expect(mockBlockchain.addTransactions.bind(mockBlockchain, missingTrxData, 0)).to.throw('Transaction data are not present');
    });
  });
  describe('on new transaction with valid data', () => {
    const data = [[0, 1, 50], [1, 2, 30], [2, 1, 100]];
    const blockSize = 2;
    const expectedAccountsBalances = [50, 120, 230];
    before(() => {
      mockBlockchain.addTransactions(data, blockSize);
      mockBlockchain.processPendingTransactions();
    });
    it('should create a new block', () => {
      expect(mockBlockchain.chain).to.have.length(2);
      expect(mockBlockchain.chain[1]).to.be.an.instanceOf(Block);
    });
    it('block size should equal to amount of data included in block', () => {
      expect(mockBlockchain.chain[1].data.length).to.equal(blockSize);
    });
    it('should equal expected account balance changes', () => {
      expect(mockBlockchain.accounts).to.eql(expectedAccountsBalances);
    });
  });
})