
const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

var input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            },
        },
    },
};

var compiled = solc.compile(JSON.stringify(input));
const contract = JSON.parse(compiled);

const toExport = {
    interface: JSON.stringify(contract.contracts["Inbox.sol"].Inbox.abi),
    bytecode: contract.contracts["Inbox.sol"].Inbox.evm.bytecode.object
};

module.exports = toExport;