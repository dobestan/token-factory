// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "./Token.sol";


contract Factory {
    struct TokenInformation {
        string name;
        string symbol;
        address owner;
        address deployedAt;
    }

    address public owner;
    TokenInformation[] public tokens;

    constructor() {
        owner = msg.sender;
    }

    function createToken(
        string memory name_,
        string memory symbol_,
        uint initial_
    ) public returns (address) {
        Token token = new Token(name_, symbol_, initial_, msg.sender);
        TokenInformation memory newTokenInformation = TokenInformation({
            name: name_,
            symbol: symbol_,
            owner: msg.sender,
            deployedAt: address(token)
        });
        tokens.push(newTokenInformation);

        return address(token);
        // token.receipt.rawLogs[0].address is ERC-20 Contract Address.
    }
}
