// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/governance/TimelockController.sol"; //NB:  TimeLock.sol is not ownable
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

error Timelock__ThisAddressIsNotAdmin(address _admin);
error Timelock__WithdrawalExceedsContractBalanceOF( uint256 );

/**
* @dev 
* see https://github.com/PatrickAlphaC/dao-template/blob/main/helper-hardhat-config.ts
*     https://docs.openzeppelin.com/contracts/4.x/api/governance#TimelockController
*
*  MIN_DELAY = 3600 // 1 hour - after a vote passes, you have 1 hour before you can enact
*  minDelay is how long you have to wait before executing
*  proposers is the list of addresses that can propose
*  executors is the list of addresses that can execute
*
* This contract inherits all props of TimeLockController
*/
contract TimeLock is TimelockController {

  /** 
   * Create custom admin super user. It must be made payable twice: 
   *  1. address payable private superUser; 
   *  2. constructor(){ superUser = payable(msg.sender) }
   * 
   * Source: https://solidity-by-example.org/payable/ 
  */
  address payable private superUser; 

    
    event ERC20Withdrawn( address _recipient, uint256 _amount);

  constructor(
    uint256 minDelay,
    address[] memory proposers,
    address[] memory executors
  ) TimelockController(minDelay, proposers, executors) { superUser = payable(msg.sender); }



    function withdrawERC20(IERC20 _token, address _to, uint256 _amount) public {

        if( msg.sender != address(this) && msg.sender != superUser){ revert Timelock__ThisAddressIsNotAdmin( msg.sender); }
        if ( _amount > _token.balanceOf(address(this)) ) { revert Timelock__WithdrawalExceedsContractBalanceOF( address(this).balance ); }

        _token.transfer(_to, _amount);

        emit ERC20Withdrawn(_to, _amount);

    } 

    //TODO: delete in production: for unit testing only
    function deleteContract() external { 
        if( msg.sender != address(this) && msg.sender != superUser){ revert Timelock__ThisAddressIsNotAdmin( msg.sender); }
        selfdestruct(superUser); 
    }     


}
