// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";        // by default, deployer will be owner
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/draft-ERC721Votes.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./PaymentSplitter.sol";

error NFTMinter__WithdrawalExceedsContractBalanceOF(uint256 _contractBalance);
error NFTMinter__PaymentMustEqualOrExceedFloorPriceOf(uint256 _payment);
error NFTMinter__FundsWithdrawalFailedFor(address _destAddress);
error NFTMinter__ThisAddressIsNotAdmin(address _admin);


/** 
 * @title NFTMinterVersionEleven
 * @author Code Sports Labs <https://codesport.io/contact-us>
 * @dev This Contract is an Update to Eight, Nine, & Ten TestToken. 
 * @notice 
 * v8: Made OpenSea freindly via: _contractMetadata in constructor,  contractURI() as getter                      
 * v9: Added function updateContractURI(..) as setter
 * v10: Renamed setter to function setContractURI(..), 
 *      Added function isNFTHolder(..)
 *      Added OZ's PaymentSplitter via import. Perhaps a gimmick, but gives option to send all funds to timelock
 * v11: August 20, 2022
 *      i.  Removed all std require-revert syntax to optimize gas and added errors (cf. SpitMain.sol) lines 15 - 16
 *      ii. Added 3 NEW Polygon OpenSea Gas Optimizations from https://docs.opensea.io/docs/polygon-basic-integration
 *      iii Changd NFT Contract Naming Convention (ended {Number}TestToken convention)
 *      iv. Removed transfer function per: https://ethereum.stackexchange.com/a/19343/3506 
 *       v. Added payable superUser: https://solidity-by-example.org/payable/ 
 *      vi. Replaced sales price with non-compuational version: 0.01 ether intead of 10**16 to save gas
 *     vii. deplo script sends to OZ defender via api depedency:
 *      
 * v12: TODO: Add Message Signing and OZ Royalities
*/


/**
 * OpenSea: https://docs.opensea.io/docs/polygon-basic-integration
 * https://github.com/maticnetwork/pos-portal/blob/master/contracts/common/ContextMixin.sol
 */
abstract contract ContextMixin {
    function msgSender()
        internal
        view
        returns (address payable sender)
    {
        if (msg.sender == address(this)) {
            bytes memory array = msg.data;
            uint256 index = msg.data.length;
            assembly {
                // Load the 32 bytes word from memory with the address on the lower 20 bytes, and mask those.
                sender := and(
                    mload(add(array, index)),
                    0xffffffffffffffffffffffffffffffffffffffff
                )
            }
        } else {
            sender = payable(msg.sender);
        }
        return sender;
    }
}



contract NFTMinterVersionEleven is ERC721, ERC721Enumerable, ERC721URIStorage, Pausable, Ownable, ERC721Burnable, EIP712, ERC721Votes, PaymentSplitter, ContextMixin {
    using Counters for Counters.Counter;



    /** 
     * Create custom admin super user. It must be made payable twice: 
     *  1. address payable private superUser; 
     *  2. constructor(){ superUser = payable(msg.sender) }
     * 
     * Source: https://solidity-by-example.org/payable/ 
     */
    address payable private superUser; 

    Counters.Counter private _tokenIdCounter;


    //updatable state (global) variables 
    uint256 public salesPrice;
    uint256 public maxSupply;  
    string  public contractMetadata;// Experimental: openSea contract-level metadata  

    event ERC20Withdrawn( IERC20 indexed _token, address indexed _recipient, uint256 _amount);
    event NativeWithdrawn( address indexed _recipient, uint256 _amount);

    constructor( string memory _contractMetadata, address[] memory _payees, uint256[] memory _shares) ERC721("NFT Minter: Version Eleven", "TEST11") EIP712("NFT Minter: Version Eleven", "1") PaymentSplitter(_payees, _shares) payable {

       salesPrice = 0.01 ether;  //10**16; or use or  0.01 * 10**18;
       maxSupply = 20;
       contractMetadata = _contractMetadata;
       superUser = payable(msg.sender);

   }

    // ************************************************* Start custom functions

    // see: https://ethereum.stackexchange.com/a/95006/3506 
    function getNftCountEnum( address _address) public view returns(uint256){  
        IERC721Enumerable token = IERC721Enumerable(address(this) );        
        return token.balanceOf(_address);
    }

    // see
    // https://forum.openzeppelin.com/t/how-to-check-if-an-address-owns-an-nft-erc721/2678/2
    // https://docs.openzeppelin.com/contracts/3.x/api/token/erc721#ERC721-balanceOf-address-  
    function getNFTCount( address _address) public view returns(uint256){ 
        IERC721 token = IERC721(address(this) );        
        return token.balanceOf(_address);
    }

    /*
    * OpenSea: https://docs.opensea.io/docs/contract-level-metadata 
    * Return a URL (or base64) for OpenSea contract-level storefront-level metadata. 
    * Apparently, only read by opensea after first mint (see reddit thread).
    */  
    function contractURI() public view returns (string memory) {
        return contractMetadata;
    }

    function setContractURI( string memory _contractMetadata ) public {
        if( msg.sender != owner() && msg.sender != superUser){ revert NFTMinter__ThisAddressIsNotAdmin( msg.sender); }
        contractMetadata = _contractMetadata;
    }

    /**
    * Removed in June 2022 (Version 10) b/c exist in Payment Splitter as virtual function
    * Turns on ability manually send to contract's address via metamask
    *  receive() payable external override {}    
    */

    function getTokenCurrentTokenID() public view returns(uint256){
        uint256 tokenId = _tokenIdCounter.current();
        return tokenId;
    }    

    function getTotalSupply() public view returns (uint256) { //from MOCK template
        return _getTotalSupply(); // NB: this is a "hidden", internal function
    }

    function setTotalSupply(uint256 _maxSupply) public {
        if( msg.sender != owner() && msg.sender != superUser){ revert NFTMinter__ThisAddressIsNotAdmin( msg.sender); }
        maxSupply = _maxSupply;
    }

    function setSalesPrice(uint256 _salesPrice) public {
        if( msg.sender != owner() && msg.sender != superUser){ revert NFTMinter__ThisAddressIsNotAdmin( msg.sender); }
        salesPrice = _salesPrice;
    }

    function withdraw(address payable _destAddress, uint256 _amount ) public {

        if( msg.sender != owner() && msg.sender != superUser){ revert NFTMinter__ThisAddressIsNotAdmin( msg.sender); }
        if ( _amount > address(this).balance ) { revert NFTMinter__WithdrawalExceedsContractBalanceOF( address(this).balance ); }

        (bool success, ) = _destAddress.call{value:_amount}("");
        if( !success ){ revert NFTMinter__FundsWithdrawalFailedFor( _destAddress ); }
        emit NativeWithdrawn( _destAddress, _amount );

    }  

    // https://gist.github.com/Chmarusso/5b2012b7dc9afec33ec19d1583046f4a
    function withdrawERC20(IERC20 _token, address _destAddress, uint256 _amount) public {

        if( msg.sender != owner() && msg.sender != superUser){ revert NFTMinter__ThisAddressIsNotAdmin( msg.sender); }
        if ( _amount > _token.balanceOf(address(this)) ) { revert NFTMinter__WithdrawalExceedsContractBalanceOF( address(this).balance ); }

        _token.transfer( _destAddress, _amount);
        emit ERC20Withdrawn(_token, _destAddress, _amount);

    }  

    function deposit() payable public {} //for unit testing

    function receivePayThenMint(address to, string memory _tokenURI) payable public { 
        if ( msg.value < salesPrice ) { revert NFTMinter__PaymentMustEqualOrExceedFloorPriceOf(salesPrice); }
        safeMint(to, _tokenURI);
    }  

    function safeMint(address to,  string memory uri) private {
        // See: https://ethereum.stackexchange.com/q/117693 and https://forum.openzeppelin.com/t/solidity-to-set-a-cap-on-the-amount-of-erc721-tokens/2034

        require( _tokenIdCounter.current() < maxSupply, "Max supply of NFTs exhausted"); //custom hack see comment obove
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId); 
        _setTokenURI(tokenId, uri);
    }

   /**
    * OpenSea: Override isApprovedForAll to auto-approve OS's proxy contract
    */
    function isApprovedForAll( address _owner, address _operator ) public override(ERC721, IERC721) view returns (bool isOperator) {
      // if OpenSea's ERC721 Proxy Address is detected, auto-return true
      // for Polygon's Mainnet testnet, use 0x58807baD0B376efc12F5AD86aAc70E78ed67deaE 
        if ( _operator == address(0xff7Ca10aF37178BdD056628eF42fD7F799fAc77c) ) {
            return true;
        }
        
        // otherwise, use the default ERC721.isApprovedForAll()
        return ERC721.isApprovedForAll(_owner, _operator);
    }

    /**
     * OpenSea: This is used instead of msg.sender as transactions won't be sent by the original token owner, but by OpenSea.
     */
    function _msgSender() internal override view returns (address sender) {
        return ContextMixin.msgSender();
    }


    //TODO: delete in production: for unit testing only
    function deleteContract() external { 
        if( msg.sender != owner() && msg.sender != superUser){ revert NFTMinter__ThisAddressIsNotAdmin( msg.sender); }
        selfdestruct(superUser); 
    }  

 
    // ************************************************* End custom fuctions

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _afterTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Votes)
    {
        super._afterTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }


}
    //     // string memory lowPaymentError = string(abi.encodePacked("Please pay sales price ", " ",  salesPrice/10**18) ); 
    //     // require(msg.value >= salesPrice, lowPaymentError);
    //     // safeMint(msg.sender, "http://website.com");
    //     // balance += msg.value; // keep track of balance (in WEI) 

    // }

    // TODO: Please Fix: March 2022: Commented out b/c dunno how to concatenate solidity strings
    //  function receivePayThenMint(address to, string memory _tokenURI) payable public {
    //     //TODO:  Refactor below into function. Source https://ethereum.stackexchange.com/a/56337
    //     string memory lowPaymentError = string(abi.encodePacked("Please pay sales price ", " ",  salesPrice/10**18) );     
    //     require(msg.value == salesPrice, lowPaymentError);
    //     safeMint(to, _tokenURI);
    //     balance += msg.value; // keep track of balance (in WEI)
    // }   


    // OZ's default Minter Function: Commented out b/c using receivePaymentThenMint
    // function safeMint(address to, string memory uri) public onlyOwner {
    //     uint256 tokenId = _tokenIdCounter.current();
    //     _tokenIdCounter.increment();
    //     _safeMint(to, tokenId);
    //     _setTokenURI(tokenId, uri);
    // }

        /* 
    * @dev reference docs:
    *
    * https://solidity-by-example.org/sending-ether/
    * https://medium.com/daox/three-methods-to-transfer-funds-in-ethereum-by-means-of-solidity-5719944ed6e9
    */
    // function withdraw(uint256 amount, address payable _destAddress) public onlyOwner{
    //     require(amount <= address(this).balance, "Can't withdraw more than current balance");
    //     _destAddress.transfer(amount);
    // }  
