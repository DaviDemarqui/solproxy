import { ethers } from "hardhat";
import { upgrades } from "hardhat";

const proxyAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

async function main() {

    console.log(proxyAddress, " original Box(proxy) address");
    const BoxV2 = await ethers.getContractFactory("BoxV2");

    console.log("Upgrade to BoxV2...");
    const boxV2 = await upgrades.upgradeProxy(proxyAddress, BoxV2);
    
    console.log(await boxV2.getAddress(), " BoxV2 address (Should be the same)");
    console.log(await upgrades.erc1967.getImplementationAddress(await boxV2.getAddress()), " getImplementationAddress");
    console.log(await upgrades.erc1967.getAdminAddress(await boxV2.getAddress()), "getAdminAddress");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})