// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "./Token.sol";


contract Factory {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function createToken(
        string memory name_,
        string memory symbol_,
        uint initial_
    ) public returns (address) {
        Token token = new Token(name_, symbol_, initial_, msg.sender);
        return address(token);
        // token.receipt.rawLogs[0].address is ERC-20 Contract Address.
    }
}
