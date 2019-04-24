# Blockchain Implementation Module

## Usage

Require the module

`const { init, getAccountBalances } = require('blockchain-implementation-module');`

Initialize a blockchain with an initial balances array, transactional data and block size

```
const initialBalances = [100, 100, 200];
const transactionalData = [[0, 1, 50], [1, 2, 30], [2, 1, 100]];
const blockSize = 2;
const chain = init(initialBalances, transactionalData, blockSize);
```

To get the balance of an address in a chain

```
const accountAddress = 0;
const balance = getAccountBalances(chain, accountAddress);
```

## Example

Run example

`node example/index.js`

## Run Tests

`npm test`


## Built With

* [Nodejs](https://nodejs.org/en/) - The JavaScript runtime - version: 8.16.0
* [Npm](https://www.npmjs.com/) - Dependency Management - version: 6.9.0
