![Builder's DAO Image 1](https://builders-dao.vercel.app/images/girl-screen-overlay.jpg)

# Project Overview: Programmable, Utility NFTs

We created a minter that generates Programmable, Utiltiy NFTs with ERC-721 DAO Governance privileges. The project was deployed to the Mumbai Testnet.

1. **Features:** These NFTs include a mini e-commerce shop, a live listing of the owners last 5 updated repos, and a DAO financial management app. 

2. **Live, Working Demo:** You may view and interact with our NFTs for DAO [member 0](https://builders-dao.vercel.app/nft/0)  and DAO [member 1](https://builders-dao.vercel.app/nft/1)

3. **Join Our DAO and Mint Programmable NFT:**  The new member registratuion page is [here](https://builders-dao.vercel.app/join-us). A GitHub account is required

3. **OpenSea:**  was able to capture [our minted NFTs](https://testnets.opensea.io/assets/mumbai/0x04d4ad7a801b8642f053dcef4ac4c3a24596a1a8/0).   
   * **NB:** In-app purchases and financial management functionality is disabled on OpenSea. This is b/c of Cross-Origin Resource Sharing (CORS) security enforced by our domain restrictions.

4. **Testnet Faucets:** Grab test USDC for Mumbai from [Swan Faucet](https://calibration-faucet.filswan.com/#/dashboard) and Testnet Matic from [Alchemy](https://mumbaifaucet.com/). This may be be usefull for interact with our team wallet.

## Chainlink: How We Integrated and Our Inspiration

1. **Integration:** Chainlink's [price feeds API](https://github.com/CodeSportLabs/dao-public/blob/main/components/HelperFunctions.js) is used to convert USD to MATIC in the mini e-commerce shop.

2. **Inspiration:** This project was inspired by Chainlink's blog posts *[What Is a Dynamic NFT?](https://blog.chain.link/what-is-a-dynamic-nft/)* and *[How to Build Dynamic NFTs on Polygon](https://blog.chain.link/how-to-build-dynamic-nfts-on-polygon/)*

3. **Acknowlegements:** Special thanks to Patrick Collins and Zubin Pratap of Chainlink for their online tutorials and guidance on how to build and test Governance contracts!

## Research and Project Resource Library

1. Code Sport [published](https://codesport.io/dao-public/) an avanced-topic resource library that will be used to further build-out the Builder's DAO ecosystem
2. Our blog post, *[Use Cases for Utility & Programmable NFTs](https://codesport.io/blockchain/dao/use-cases-for-programmable-and-utility-nfts/)*, educates the community about these novel NFTs


<!--https://builders-dao.vercel.app/images/analyst-typing.jpg
## Who We Are

Code Sport is small  team of **volunteer** Engineers in the USA and Singapore.

We enjoy coding novel use cases for Programmable, Utility NFTs.  We see NFTs as tokenized React Applications. You may read our discussion on Progammable, Utility NFTs on our [blog](https://codesport.io/blockchain/dao/use-cases-for-programmable-and-utility-nfts/).

 The below caption is a summary of our thinking:

[![nft-vision-quote-from-marcos|690x160](https://global.discourse-cdn.com/business4/uploads/trondao/original/2X/5/567a7a6da9420ac99271d75ee3fce1f3e1de03f3.png)](https://codesport.io/blockchain/dao/use-cases-for-programmable-and-utility-nfts/)

# Features

1. Display a live listing of NFT holder's last 5 Github repos 
2. Mini-ecommerce shop. Uses Chainlink Price Feeds to convert USD to Matic: 
   * Test Credit Card Number: 4111 1111 1111 1111
   * Test CSV: 123

3. NFT holders may vote on Governance proposals

4. Display and Interact with Smart Contract Financials

5. Anyone may submit a proposal.
--->

# Deploy of Smart Contract to Mumbai on August 21, 2022

Smart Contract Addresses:

```
$ npx hardhat run scripts/deploy-eleven.js --network mumbai

pinFileToIPFS Output:
{
  IpfsHash: 'QmcK9hxrMB5JbY7gCrcvFThQ5jbbsWyzJngaYwx4YnmbWP',
  PinSize: 54533,
  Timestamp: '2022-08-22T01:01:42.845Z'
}
File URL: https://gateway.pinata.cloud/ipfs/QmcK9hxrMB5JbY7gCrcvFThQ5jbbsWyzJngaYwx4YnmbWP
DAO Logo IPFS URL: QmcK9hxrMB5JbY7gCrcvFThQ5jbbsWyzJngaYwx4YnmbWP

Minter Contract Metadata URI: data:application/json;base64,eyJjb250cmFjdF9tZXRhZGF0YSI6eyJuYW1lIjoiTkZUIE1pbnRlcjogVmVyc2lvbiBFbGV2ZW4iLCJkZXNjcmlwdGlvbiI6IkJ1aWxkZXJzJyBEQU8gKEl0ZXJhdGlvbiAjMTEpIHNwZWNpYWxpemVzIGluIGNyZWF0aW5nIFByb2dyYW1tYWJsZSBVdGlsaXR5IE5GVHMuIFdlIHNlZSBORlRzIGFzIHRva2VuaXplZCBzb2Z0d2FyZSBhcHBsaWN0aW9ucyIsImltYWdlIjoiaXBmczovL1FtY0s5aHhyTUI1SmJZN2dDcmN2RlRoUTVqYmJzV3l6Sm5nYVl3eDRZbm1iV1AiLCJleHRlcm5hbF9saW5rIjoiaHR0cHM6Ly9idWlsZGVycy1kYW8udmVyY2VsLmFwcCIsInNlbGxlcl9mZWVfYmFzaXNfcG9pbnRzIjoyMDAwLCJmZWVfcmVjaXBpZW50IjoiMHg2NTBBYzkxOEM5ZTlDNUY1OGYwM0MyODQ1YjJDMTFDNDM4QWI1QkY3In19

TimeLock deployed TO: 0x0854B10473Ef65870A60e0f03BA94AAE4563d998
NFT Minter deployed TO: 0x04d4Ad7A801B8642f053dCEf4Ac4C3a24596a1a8
Governor deployed TO:  0xdBbCAa174Ec275b36239eB0A14115Cee45CD7372
Box contract deployed TO: 0x7EEdF9489d6E4594FadA47E3dB3415872894Ccb6

USDC Mumbai Testnet Contract Address: 0xe11a86849d99f524cac3e7a0ec1241828e332c62
0xSplit Contract Address: 0xAEDC3E203A84dB63926Bb775F3183D851a4D2a16
```






<!--
# Project Details

We are seeking to Spin-off our [**Programmable and Utility NFT R&D efforts** ](https://codesport.io/blockchain/dao/use-cases-for-programmable-and-utility-nfts/) into a global and autonomous DAO. The DAO shall be a Blockchain Development Studio focused on serving:

* Fortune 500 companies
* Digital Studios & Marketing Agencies (i.e., Digital Marketing Agencies) 

Our studio is currently iterating over novel Blockchain business. These Blockchain projects primarily for Fortune 500 companies as well as Digital Studios & Marketing Agencies.

We also incubate  promising internal projects such as [Fitness Ventures](https://forum.trondao.org/t/fitness-ventures-launch-a-real-life-fitness-group-on-the-blockchain/4382)

There is demand for our business. According to [TechCrunch](https://techcrunch.com/2022/07/14/nft-brand-loyalty-platform-hang-banks-16-million-from-paradigm/):

> Web3 startup [Hang](https://www.hang.xyz/) is one such startup looking to build up a client base of brands and help them leverage NFTs to replace their existing membership and loyalty programs

We explore these use cases further in our blog post, [**Use Cases for Utility & Programmable NFTs**](https://codesport.io/blockchain/dao/use-cases-for-programmable-and-utility-nfts/)

### Programmable, Utility NFTs Use Cases
Our goal is to encourage the use of NFTs as primitives for:

* Cash flows and  monetary and non-monetary entitlements including salaries, prizes, and incentives for loyalty programs
* Blockchain-based credentialing (e.g., memberships)
* Proof of provenance
* Proof of work (completed labor)
* Proof of attendance (of events)

We see NFTs as tokenized **React Applications**. Novel features of such NFTs include:

1. Programmable payments (e.g. salaries, dividends, interest, awards, etc.)
2. Access control functionality (membership)*
3. Governance (Voting) via an ERC-721 DAO
4. Dynamic QR Codes
5. Payment Escrows
6. Brick and mortar payments integration (QR code scanning and crypto wallet integration)
7. Mini E-Commerce Stores 

### Project Milestones & Features 

* [Roadmap: DAO Buildout June 21 to June 28](https://codesport.io/blockchain/dao/roadmap-dao-buildout-june-21-to-june-28/)
* [Roadmap: DAO Buildout July 5 to July 15](https://codesport.io/blockchain/dao/roadmap-dao-buildout-july-5-to-july-15/)
* [Building a Core Dev Team & Incentivizing the Right Behaviors](https://codesport.io/business-strategy/daos-incentivizing-the-right-behaviors/)


### Governance Variables

These are mutable and will be published on the proposal page.

```javascript
    const MIN_DELAY      = 3600  // 3600 = 1 hour - after a vote passes, you have 1 hour before you can enact  
    const VOTING_PERIOD  = 547  // 45818 Blocks = 1 week - how long the vote lasts. | 547 Blocks = 2 hours
    const VOTING_DELAY   = 1    // 1 Block = 13.2 seconds - How many blocks till a proposal vote becomes active
    const QUORUM_PERCENT = 80   // 4 = 4% of voters to must vote for a proposal to pass | 80 = 80%
```
All monies sent to minter go to TimeLock Via OpenZeppelin's Payment Splitter.  Money in TimeLock must be voted on to go anywhere else!

**NB:** `Box.sol` is currently owned by `TimeLock.sol` in order to demonstrate governance.  We reserve the optionm to make Minter and Governor owned by TimeLock.

### Smart Contract Governance Unit Test Results:

![Governance Unit Testing](https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/002/043/266/datas/gallery.jpg)

### Bug Fixes

**1.** Allow finance pages to be viewed by users without Metamask wallets. That is, `window.ethereum == undefined`

**2.** The frontend code for the `vote` page should alert if users are not members and redirect somewhere else. Also, we need to add timer/countdown until voting period expires.


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
-->
