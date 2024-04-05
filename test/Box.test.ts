import {expect} from "chai";
import {ethers} from "hardhat";
import {Contract} from "ethers";

describe("Box", function () {
    let box: Contract;

    beforeEach(async function () {
        const Box = await ethers.getContractFactory("Box");
        this.box = await Box.deploy();
        await this.box.waitForDeployment();
    });

    it("should retrieve value previously stored", async function () {
        await this.box.store(42);
        expect(await this.box.retrieve()).to.equal(42);

        await this.box.store(100)
        expect(await this.box.retrieve()).to.equal(100);
    })
})