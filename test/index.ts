import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";
import { claimableBalances } from "../constants";

describe("Greeter", function () {
  let greeter: Contract;
  let alice: SignerWithAddress;
  const addresses = Object.keys(claimableBalances);
  const balances = Object.values(claimableBalances);

  beforeEach(async () => {
    const Greeter = await ethers.getContractFactory("Greeter");

    [alice] = await ethers.getSigners();

    greeter = await Greeter.deploy(addresses, balances);

    await greeter.deployed();
  });

  describe("Init", async () => {
    it("should initialize", async () => {
      expect(greeter).to.be.ok;
    });
  });

  describe("Claim", async () => {
    it("should claim correct amount", async () => {
      const toTransfer = ethers.utils.parseEther("10");
      const balanceBefore = await greeter.claimableBalance(alice.address);

      await greeter.connect(alice).claim(toTransfer);

      const expectedBalance = balanceBefore.sub(toTransfer);

      expect(await greeter.claimableBalance(alice.address)).to.eq(
        expectedBalance
      );
    });

    it("should update claimable status", async () => {
      const toTransfer = await greeter.claimableBalance(alice.address);
      expect(await greeter.isClaimable(alice.address)).to.eq(true);

      await greeter.connect(alice).claim(toTransfer);

      expect(await greeter.isClaimable(alice.address)).to.eq(false);
    });
  });
});
