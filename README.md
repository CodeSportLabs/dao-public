# Builder's DAO Public Repo

Our website is live and may be tested on:

* [Polygon's Mumbai Testnet](https://builders-dao.vercel.app/) 
* [BitTorrent Chain's Donau Testnet](https://bttc-builders-dao.vercel.app/)

The code for this project is in a private repo. If you need access please contact [Code Sport Labs by email](https://codesport.io/contact-us)

## Governance Constants

```javascript
    const MIN_DELAY      = 3600  // 3600 = 1 hour - after a vote passes, you have 1 hour before you can enact  
    const VOTING_PERIOD  = 547  // 45818 Blocks = 1 week - how long the vote lasts. | 547 Blocks = 2 hours
    const VOTING_DELAY   = 1    // 1 Block = 13.2 seconds - How many blocks till a proposal vote becomes active
    const QUORUM_PERCENT = 80   // 4 = 4% of voters to must vote for a proposal to pass | 80 = 80%
```
All monies sent to minter go to TimeLock Via OpenZeppelin's Payment Splitter.  Money in TimeLock must be voted on to go anywhere else!

**NB:** `Box.sol` is currently owned by `TimeLock.sol` in order to demonstrate governance.  May also make Minter and Governor owned by TimeLock.

![Builder's DAO Image 1](https://bttc-builders-dao.vercel.app/images/analyst-typing.jpg)

## Deploy Output for BitTorrent Chain

```
$ npx hardhat run scripts/deploy-ten.js --network bittorrent
pinFileToIPFS Output:
{
  IpfsHash: 'QmS892492WbNRQ8W3b5KZ3sVv7mCPLbe3e77gSLqJsGsKU',
  PinSize: 17524,
  Timestamp: '2022-06-26T03:18:52.737Z',
  isDuplicate: true
}
File URL: https://gateway.pinata.cloud/ipfs/QmS892492WbNRQ8W3b5KZ3sVv7mCPLbe3e77gSLqJsGsKU
DAO Logo IPFS URL: QmS892492WbNRQ8W3b5KZ3sVv7mCPLbe3e77gSLqJsGsKU
pinMetaDataToIPFS Output:
{
  IpfsHash: 'QmXp4c2CfjXiZzXuNBx8rWYZDZsQautV7jzQKndEd1sMGD',
  PinSize: 385,
  Timestamp: '2022-07-13T14:31:10.147Z',
  isDuplicate: true
}
Meta Data URL:https://gateway.pinata.cloud/ipfs/QmXp4c2CfjXiZzXuNBx8rWYZDZsQautV7jzQKndEd1sMGD
Contract Meta Data CID: QmXp4c2CfjXiZzXuNBx8rWYZDZsQautV7jzQKndEd1sMGD
Minter Contract deployed TO: 0xDEDBee72339abd7Bd0Ea2fC7080917530f9B2938
Minter Contract Metadata URI: ipfs://QmXp4c2CfjXiZzXuNBx8rWYZDZsQautV7jzQKndEd1sMGD
Time Lock deployed TO: 0x4768aB822D44Cb3534E2cCc98BB967e8eC276656
Governor deployed TO:  0xe106A4E201e638610b0CcED7981158b1bba8A228
Box contract deployed TO: 0xd489ae78b6ef453bfb0d7741a9e46024c88a47a1
All contracts deployed BY:  0x650Ac918C9e9C5F58f03C2845b2C11C438Ab5BF7
```


## Deploy Output for Mumbai

```
 $ npx hardhat run scripts/deploy-ten.js --network mumbai
pinFileToIPFS Output:
{
  IpfsHash: 'QmS892492WbNRQ8W3b5KZ3sVv7mCPLbe3e77gSLqJsGsKU',
  PinSize: 17524,
  Timestamp: '2022-06-26T03:18:52.737Z',
  isDuplicate: true
}
File URL: https://gateway.pinata.cloud/ipfs/QmS892492WbNRQ8W3b5KZ3sVv7mCPLbe3e77gSLqJsGsKU
DAO Logo IPFS URL: QmS892492WbNRQ8W3b5KZ3sVv7mCPLbe3e77gSLqJsGsKU
pinMetaDataToIPFS Output:
{
  IpfsHash: 'QmXp4c2CfjXiZzXuNBx8rWYZDZsQautV7jzQKndEd1sMGD',
  PinSize: 385,
  Timestamp: '2022-07-13T14:31:10.147Z',
  isDuplicate: true
}
Meta Data URL:https://gateway.pinata.cloud/ipfs/QmXp4c2CfjXiZzXuNBx8rWYZDZsQautV7jzQKndEd1sMGD
Contract Meta Data CID: QmXp4c2CfjXiZzXuNBx8rWYZDZsQautV7jzQKndEd1sMGD
Minter Contract Metadata URI: ipfs://QmXp4c2CfjXiZzXuNBx8rWYZDZsQautV7jzQKndEd1sMGD

Minter Contract deployed TO: 0xEB5fD1EC487Dcc051bb864d640aB279d981A4F12
Time Lock deployed TO: 0xE91df560fC839F952A632f07AF19b16912dD52Ec
Governor deployed TO:  0x22F381B22252D3F2B0Fc1F2435042CCdA7c3Bd57
Box Contract deployed TO: 0x3902F8E827EFC4b56DEB02aB0697D65F3D9F3aE0
(Fake) USDC Mumbai Testnet Contract Address: 0xe11a86849d99f524cac3e7a0ec1241828e332c62
(Fake) DAI Mumbai Testnet Contract Address: 0xa362893f40fcc2430b4d95c6f420e923d7d793e2
0xSplit Contract Address: 0xAEDC3E203A84dB63926Bb775F3183D851a4D2a16
```

# Project Resources

## Ethereum to Polygon Asset Bridging
* [Bridge Assets to Polygon <-> Ethereum Mainnet](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request)
* [Bridging Assets to Polygon: Step-by-step Guide](https://blog.forcedao.com/bridging-assets-to-polygon-step-by-step-guide-c0c84c94513d)
* [How To Bridge Tokens From Ethereum To Polygon With Metamask](https://consensys.net/blog/metamask/how-to-bridge-tokens-from-ethereum-to-polygon-with-metamask/)
* [Google SERP]()

## DeFi, Assest on Ethereum's Mainnet, and Governance on Polygon
* Crosschain & Multichain Asset Bridges (Vote on One Chain Execute and Invest on Another)
    * [Map Protocol](https://maplabs.io)
    * [Layer Zero](https:/layerzero.network/developers)

* DeFi: Passive Investment Income Tools 
    * [Flash Loans](https://blog.openzeppelin.com/flash-mintable-asset-backed-tokens/): OpenZeppelin Workshop
    * [Build An Exchange](https://docs.0x.org/introduction/guides)
    * [Earn Rewards Staking with Matic](https://www.coinbase.com/learn/wallet/how-to-earn-rewards-staking-with-matic): Tut by Coinbase
    * [Building With DeFi on Ethereum](https://blog.coinbase.com/introduction-to-building-on-defi-with-ethereum-and-usdc-part-1-ea952295a6e2#ab6f): by Coinbase


## Factories and Clones
* [Creating Contracts from a Contract](https://www.youtube.com/watch?v=CyzsUA12ju4&t=2s): Youtube Tutorial from Smart Contract Programmer
* [Contract Deployment Through Clones](https://blog.openzeppelin.com/workshop-recap-cheap-contract-deployment-through-clones/): OpenZeppelin Workshop


## Fake USDC on Mumbai
* [Polygon Scan for Fake USDC Mumbai](https://mumbai.polygonscan.com/address/0xe11a86849d99f524cac3e7a0ec1241828e332c62)
* [Faucet for Fake USDC Mumbai](https://calibration-faucet.filswan.com/#/dashboard)
* [Fileswan Faucet Explainer](https://docs.filswan.com/development-resource/swan-token-contract/acquire-testnet-usdc-and-matic-tokens)

## Real USDC on Mumbai & Mainnet
* [Official USDC on Mumbai Testnet](https://developers.circle.com/docs/usdc-on-testnet#bridged-usdc-on-polygon-testnet)
* [USDC Testnet SDK for Credit Cards](https://developers.circle.com/docs/getting-started-with-the-circle-payments-api)

## Payment Splitter: 0xSplits.xyz
* [Docs: Programmaticallly Create a Split](https://docs.0xsplits.xyz/smartcontracts/SplitMain#createsplit)
* [GitHub: Programmaticallly Update a Contract](https://github.com/0xSplits/splits-contracts/blob/main/test/SplitMain.ts#L554-L567)
* [Docs: Programmaticallly Update a Contract](https://docs.0xsplits.xyz/smartcontracts/SplitMain#updatesplit)

## NFT Storage Tutorials (Alternative to Pinata)
* [Polygon Tutorial](https://docs.polygon.technology/docs/develop/nftstorage/)
* [NFT.Storage JavaScript API](https://docs.polygon.technology/docs/develop/nftstorage/)
* [NFT.Storage JavaScript client library](https://nft.storage/docs/client/js/) (VERY confusing)

## Possible Project Upgrades
* [Polygon Basic Integration & Meta-transactions](https://docs.opensea.io/docs/polygon-basic-integration)
* [Build an NFT Market Place on Polygon](https://dev.to/edge-and-node/building-scalable-full-stack-apps-on-ethereum-with-polygon-2cfb)
* [Signing a Message With Ethers.js](https://www.google.com/search?q=signing+a+message+with+ethers.js&oq=signing+a+message+with+ethers.js) 
    * [Dev.to Tutorial: Signatures as Authentication](https://dev.to/lparvinsmith/signatures-as-authentication-in-web3-3kod)
    * [Signing a Message With Ethers.js](https://www.youtube.com/watch?v=vhUjCLYlnMM): Youtube tut by Artur Chmaro 
    * [Signing a Message With Ethers.js](https://www.youtube.com/watch?v=Y6MtQG6IEGk): Youtube tut by Smart Contract Developer Youtube 
        * [Project Repo](https://github.com/t4sk/hello-erc20-permit)
* [Getting Multichan Data With Covalent](https://medium.com/encode-club/polygon-hackathon-getting-multi-chain-web3-data-with-one-unified-api-video-slides-fdcb787bcc79)
* Programmatically Beautify JSON Metadata
    * [StackOverflow](https://stackoverflow.com/a/11677276/946957)
    * [Tutorial: Pretty `JSON.stringify()` Output in JavaScript](https://thecodebarbarian.com/pretty-json-stringify-output.html)  

## Ethers.js Patterns
[Web3Connect With Specific Provider](https://github.com/diegoalzate/encode-bootcamp-group-23/blob/8735c7f52f84b8be982fa7e7c8641ff437a79dbf/packages/frontend/src/clientUtils.js)

## How to Use SafeERC20
> ...add a using [SafeERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol) for IERC20; statement to your contract, which allows you to call the safe
> operations as token.safeTransfer(…​), etc.
> * **Source:** *  [OZ Docs](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#SafeERC20)

[How to Use SafeERC20](https://forum.openzeppelin.com/t/how-to-use-safeerc20/6342)
[SafeERC20, TokenTimelock, Wrappers](https://forum.openzeppelin.com/t/safeerc20-tokentimelock-wrappers/396)
[...Understand How SafeERC20 Works](https://forum.openzeppelin.com/t/making-sure-i-understand-how-safeerc20-works/2940)

## Redirect Your Local Repo to a New Upstream or Origina


list remotes: `git remote -v`

<!-- remove connection: `git remote  name_of_remote_to_remove` -->

remove and add new connection in one-shot: 
git remote set-url `<origin-to-replace || upstream-to-replace>` `<git@github...new-repo.git || https://...new-repo.git>`

NB: replace items in `< >` with one of the options patterns inside designated by `||`

# Housekeeping Items: TODOs

* Add message signing to NFT Minter
* Minter Upgrade: [Polygon Basic Integration & Meta-transactions](https://docs.opensea.io/docs/polygon-basic-integration)  
