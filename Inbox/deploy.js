const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require("./compile");
const config = require('./config.js');

const provider = new HDWalletProvider(
    config.mnemonicPassPhrase,
    config.connectionAddress
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy from account", accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['First deploy'] })
        .send({ from: accounts[0], gas: '1000000' });

    console.log('Contract deployed to',  result.options.address);
};

deploy();