import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";
import { stakedBalances } from "../constants";

describe("Greeter", function () {
  let greeter: Contract;
  const addresses = Object.keys(stakedBalances);
  const balances = Object.values(stakedBalances);

  beforeEach(async () => {
    const Greeter = await ethers.getContractFactory("Greeter");
    greeter = await Greeter.deploy(addresses, balances);

    await greeter.deployed();
  });

  describe("Init", async () => {
    it("should initialize", async () => {
      expect(greeter).to.be.ok;
    });
  });
});
