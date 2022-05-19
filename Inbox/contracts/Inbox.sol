pragma solidity ^0.8.13;
//SPDX-License-Identifier: UNLICENSED

contract Inbox {
    string public message;

    constructor(string memory initialMessage) {
        message = initialMessage;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}