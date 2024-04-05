import { expect } from "chai";
import { Contract } from "ethers";
import { ethers, upgrades } from "hardhat";

describe("Box (proxy)", function () {
    let box: Contract;

    this.beforeEach(async function () {
        const Box = await ethers.getContractFactory("Box");
        this.box = await upgrades.deployProxy(Box, [42], { initializer: 'store' });
    });

    it("should retrieve the value previously stored", async function () {
        expect(await this.box.retrieve()).to.equal(42);

        await this.box.store(100);
        expect(await this.box.retrieve()).to.equal(100);
    })
})