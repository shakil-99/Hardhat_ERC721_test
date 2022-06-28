// const { ethers } = require("hardhat");

async function main(){
    const deploy = await ethers.getSigners();
    const Token = await ethers.getContractFactory("ERC721_");
    const token = await Token.deploy();
    
    console.log("The Token address is:-",token.address);
}

main()

.then(()=>process.exit(0))
.catch((error)=>{
    console.log(error)
    process.exit(0)
})