const {expect} = require("chai");

const {ethers} = require("hardhat");

describe("ERC721_ contract",function(){
    let hardhatToken;
    let owner;
    let addr1;
    let addr2;
    let addr3;
    let addr;

    beforeEach(async function(){
       const Token = await ethers.getContractFactory("ERC721_");
        [owner,addr1,addr2,addr3,...addr] = await ethers.getSigners();
        hardhatToken = await Token.deploy();
    })

    describe("Mint function",async function(){
        it("It should be minted at address zero",async function(){
            await hardhatToken.mint(owner.address,1)
            expect(await hardhatToken.balanceOf(owner.address)).to.equal(1);
        })
    })

    describe("Mint function",async function(){
        it("Minting by owner at another address",async function(){
            await hardhatToken.mint(addr1.address,1)
            expect(await hardhatToken.balanceOf(addr1.address)).to.equal(1);
        })
    })

   

    describe("Transfer From",async function(){
        it("Sending nfts from owner to addr1",async function(){
            await hardhatToken.mint(owner.address,1)
            await hardhatToken.transferFrom(owner.address,addr1.address,1)
            expect(await hardhatToken.balanceOf(addr1.address)).to.equal(1);

            await hardhatToken.connect(addr1).transferFrom(addr1.address,addr2.address,1)
            expect(await hardhatToken.balanceOf(addr2.address)).to.equal(1);
            //await expect(hardhatToken.connect(addr2).transferFrom(addr1.address, addr3.adress, 2))
            //.to.be.revertedWith("ERC721: approve caller is not token owner nor approved for all");
        })
    })

    describe("Burn Function",async function(){
        it("TokenId is burn ",async function(){
            await hardhatToken.mint(owner.address,2)
            await hardhatToken.burn(2)
            expect(await hardhatToken.balanceOf(owner.address)).to.be.equal(0);

        })
    })

    describe("SafeTransferFrom",async function(){
        it("Tranfering tokenId using SafeTransferFrom",async function(){
            await hardhatToken.mint(owner.address,1);
            expect(await hardhatToken.balanceOf(owner.address)).to.equal(1)
           
        // });
        // it("Tranfering tokenId using SafeTransferFrom after minting",async function(){
            await hardhatToken.safeTransferFrom_(owner.address,addr3.address,1);
            expect(await hardhatToken.balanceOf(addr3.address)).to.equal(1);

        })
    })

    describe("Approve function",async function(){
        it("Owner giving approve to other address",async function(){
            await hardhatToken.mint(owner.address,1);
            await hardhatToken.approve(addr1.address,1)

            await hardhatToken.connect(addr1).transferFrom(owner.address,addr2.address,1);

            expect(await hardhatToken.balanceOf(addr2.address)).to.equal(1);
        })
    })

    describe("setApprovedforAll and isApprovedforAll",async function(){
        it("Check Approved or not approved",async function(){
            await hardhatToken.mint(owner.address,1);
            expect(await hardhatToken.balanceOf(owner.address)).to.equal(1);

            await hardhatToken.connect(owner).setApproveforAll(addr1.address,true);
            expect(await hardhatToken.isApproveforAll(owner.address,addr1.address)).to.equal(true);

        })
    })

    describe("usaid",async function(){

    })

    
})