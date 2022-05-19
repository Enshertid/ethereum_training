const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require("../compile");

let accounts;
let inbox;

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    // Use one of those accounts to deploy the contract

    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hello'] })
        .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });
    it('is message set', async () => {
        const message = await inbox.methods.message().call();
        assert.equal('Hello', message);
    });

    it('is message changes', async () => {
        const newMessage = "Hello again";
        await inbox.methods.setMessage(newMessage).send({ from :accounts[0]});
        const message = await inbox.methods.message().call();
        assert.equal(newMessage, message);
    });
});

// class Car {
//     park() {
//         return 'stopped';
//     }
//     drive() {
//         return 'vroom';
//     }
// }
// let car;
// describe('Car', () => {
//     beforeEach('create instance of car', () =>{
//         console.log("creation of new car");
//         car = new Car();
//     });
//     it('is park worked', () => {
//         assert.equal(car.park(), 'stopped');
//     })
//     it('is drive worked', () => {
//         assert.equal(car.drive(), 'vroom');
//     })
// });