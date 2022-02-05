// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract Token is ERC20 {
    constructor(
        string memory name_,
        string memory symbol_,
        uint initial_,
        address owner
    ) ERC20(name_, symbol_) {
        _mint(
            owner,
            initial_ * (10 ** decimals())
        );
    }
}
