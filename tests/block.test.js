const { expect } = require('chai');

const Block = require('../lib/Block');
// mock data
let mockBlock = {};
const mockData = [[1, 2, 3], [2, 3, 1]];
const mockPrevHash = 'mock_prev_hash';
const mockHash = '06045c48a51653d3a4683caf8c60edea830e916157e303ec3314f1cc4882a298';



describe('Testing Block', () => {
  before(() => {
    mockBlock = new Block(mockData, mockPrevHash);
  })
  describe('on new instance', () => {
    it('should be an instance of Block', () => {
      expect(mockBlock).to.be.an.instanceOf(Block);
    });
    it('should have correct previous hash set', () => {
      expect(mockBlock.previousHash === 'mock_prev_hash');
    });
    it('should have have correct data', () => {
      expect(mockBlock.data).to.eql(mockData);
    });
    it('should have correct hash', () => {
      expect(mockBlock.hash).to.equal(mockHash);
    });
  });
  describe('on validating hash', () => {
    it('should be equal with block hash', () => {
      expect(mockBlock.hash).to.equal(mockBlock.generateHash());
    });
  })
  describe('on tinkering with previousHash', () => {
    // this test is isolated, uses another instance of block
    // to prevent other assertions failing
    const mockBlockNewHash = new Block(mockData, mockPrevHash);
    it('new hash should change', () => {
      mockBlockNewHash.previousHash = 'new_previous_hash';
      expect(mockBlockNewHash.hash).to.not.equal(mockBlockNewHash.generateHash());
    });
  });
  describe('on tinkering with timestamp', () => {
    it('new hash should not change (timestamp does not take part in hash validation)', () => {
      mockBlock.timestamp = new Date();
      expect(mockBlock.hash).to.equal(mockBlock.generateHash());
    });
  });
  describe('on tinkering with data', () => {
    // this test is isolated, uses another instance of block
    // to prevent other assertions failing
    const mockBlockNewHash = new Block(mockData, mockPrevHash);
    it('new hash should change', () => {
      mockBlockNewHash.data = [['8', '9', '10']];
      expect(mockBlockNewHash.hash).to.not.equal(mockBlockNewHash.generateHash());
    });
  });
});
