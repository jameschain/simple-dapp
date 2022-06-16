//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Greeter is ERC20 {
    // userAddress => balance
    mapping(address => uint256) public claimableBalance;
    // userAddress => isClaimed boolean
    mapping(address => bool) public isClaimable;

    event Claim(address indexed from, uint256 amount);

    constructor(address[] memory _addresses, uint256[] memory _balances)
        ERC20("SSTOKEN", "SS")
    {
        require(
            _addresses.length == _balances.length,
            "Addresses and balances length not matching"
        );

        uint256 addressLength = _addresses.length;

        for (uint256 i = 0; i < addressLength; i++) {
            claimableBalance[_addresses[i]] = _balances[i];
            isClaimable[_addresses[i]] = true;
        }
    }

    function claim(uint256 amount) public {
        require(
            isClaimable[msg.sender] =
                true &&
                claimableBalance[msg.sender] >= amount,
            "Not a claimable user or you tried to claim bigger amount"
        );

        claimableBalance[msg.sender] -= amount;
        _mint(msg.sender, amount);

        if (claimableBalance[msg.sender] == 0) {
            isClaimable[msg.sender] = false;
        }
        emit Claim(msg.sender, amount);
    }
}
