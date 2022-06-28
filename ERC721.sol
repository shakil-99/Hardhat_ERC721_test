// SPDX-License-Identifier: UNLICENSED
//This is a smart contract ERC721 i am going to do hardhat testing on this contract
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ERC721_ is ERC721{

    uint256 _totalSupply;

    mapping(address=>uint256)balances;

    constructor()ERC721("Lion Punks","lon"){
    }

    function mint(address to,uint256 tokenId)public returns(bool){
      console.log("***Minting at address: %s and the tokenId is:- %s",to,tokenId);
      require (to !=address(0),"ERC721:mint at address zero");
      require(!_exists(tokenId),"This token ID is already minted");
      _mint(to,tokenId);
      return true;
    }

    function burn(uint256 tokenId)public {
      _burn(tokenId);
    }

    function transferFrom(address from,address to,uint256 tokenId)public override {
      console.log("Transfering from %s to %s and the tokenId is:- %s",from,to,tokenId);

      require(ERC721.ownerOf(tokenId)== from,"ERC721: transfer from incorrect owner");
      require(to != address(0)," transfer to the zero address");
      // require(balances[from] >= tokenId,"Not enough tokens");
      _transfer(from, to, tokenId);
    }

    function safeTransferFrom_(address from,address to,uint256 tokenId)public{

      require(from != address(0),"ERC721: from address should be not at address zero");
      _safeTransfer(from, to, tokenId," ");
    }

     

    //  function _safeTransferfrom(address from,address to,uint256 tokenId) internal  {

    //     // require(checkOnERC721Received(from, to, tokenId, data), "ERC721: transfer to non ERC721Receiver implementer");
    //     // _beforeTokenTransfer(from, to, tokenId); 

    //     balances[from] -= tokenId;
    //     balances[to] += tokenId;
    //     // owner[tokenId] = to;

    //  }

    function approve(address to, uint256 tokenId)public override{
      require( to != msg.sender,"ERC721: you already owned this token");
      _approve(to,tokenId);
    }

    function setApproveforAll(address operator, bool approved)public{
      setApprovalForAll(operator,approved);
    }

    function isApproveforAll(address owner,address operator)public view returns(bool){
      isApprovedForAll(owner,operator);
      return true;
    }
}
