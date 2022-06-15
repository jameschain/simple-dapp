//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Greeter is ERC20 {
    // userAddress => balance
    mapping(address => uint256) public stakedBalance;
    // userAddress => isClaimed boolean
    mapping(address => bool) public isStaked;

    event Claim(address indexed from, uint256 amount);

    constructor(address[] memory _addresses, uint256[] memory _balances)
        ERC20("SSTOKEN", "SS")
    {
        require(
            _addresses.length == _balances.length,
            "Address and balance length not matching"
        );

        uint256 addressLength = _addresses.length;

        for (uint256 i = 0; i < addressLength; i++) {
            stakedBalance[_addresses[i]] = _balances[i];
        }
    }

    function claim(uint256 amount) public {
        require(
            isStaked[msg.sender] =
                true &&
                stakedBalance[msg.sender] >= amount,
            "Nothing to claim"
        );

        uint256 balanceTransfer = amount;
        amount = 0;
        stakedBalance[msg.sender] -= balanceTransfer;
        _mint(msg.sender, balanceTransfer);

        if (stakedBalance[msg.sender] == 0) {
            isStaked[msg.sender] = false;
        }
        emit Claim(msg.sender, balanceTransfer);
    }
}
