// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "./Token.sol";


contract Factory {
    event TokenCreated(
        address indexed owner,
        address token
    );

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

        emit TokenCreated(msg.sender, address(token));

        return address(token);
        // token.receipt.rawLogs[0].address is ERC-20 Contract Address.
    }

    function getTokens() public view returns (TokenInformation[] memory) {
        return tokens;
    }
}
