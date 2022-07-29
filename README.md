# Project Goal
We are  a team of Full Stack Blockchain Software Engineers in the USA and Singapore. 

Our focus is on building Programmable, Utility NFTs.  We see NFTs as tokenized React Applications.

[![nft-vision-quote-from-marcos|690x160](https://aws1.discourse-cdn.com/business4/uploads/trondao/original/2X/5/567a7a6da9420ac99271d75ee3fce1f3e1de03f3.png)](https://codesport.io/blockchain/dao/use-cases-for-programmable-and-utility-nfts/)

Our goal is to do projects on commission for Fortune 500 companies and other Web 3 studios. 

# Builder's DAO Public Repo

Our website is live and may be tested on:

* [Polygon's Mumbai Testnet](https://builders-dao.vercel.app/) 
* [BitTorrent Chain's Donau Testnet](https://bttc-builders-dao.vercel.app/)

View the resource library at: https://codesport.io/dao-public

The code for this project is in a private repo. If you need access please contact [Code Sport Labs by email](https://codesport.io/contact-us)

## Governance Constants

These are mutable and will be published on the proposal page.

```javascript
    const MIN_DELAY      = 3600  // 3600 = 1 hour - after a vote passes, you have 1 hour before you can enact  
    const VOTING_PERIOD  = 547  // 45818 Blocks = 1 week - how long the vote lasts. | 547 Blocks = 2 hours
    const VOTING_DELAY   = 1    // 1 Block = 13.2 seconds - How many blocks till a proposal vote becomes active
    const QUORUM_PERCENT = 80   // 4 = 4% of voters to must vote for a proposal to pass | 80 = 80%
```
All monies sent to minter go to TimeLock Via OpenZeppelin's Payment Splitter.  Money in TimeLock must be voted on to go anywhere else!

**NB:** `Box.sol` is currently owned by `TimeLock.sol` in order to demonstrate governance.  We reserve the optionm to make Minter and Governor owned by TimeLock.

## Smart Contract Governance Unit Test Results:

![Governance Unit Testing](https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/002/043/266/datas/gallery.jpg)

## Project Info


We are seeking to Spin-off our [**Programmable and Utility NFT R&D efforts** ](https://codesport.io/blockchain/dao/use-cases-for-programmable-and-utility-nfts/) into a global and autonomous DAO. The DAO shall be a Blockchain Development Studio focused on serving:

* Fortune 500 companies
* Digital Studios & Marketing Agencies (i.e., Digital Marketing Agencies) 

Our studio is currently iterating over novel Blockchain business. These Blockchain projects primarily for Fortune 500 companies as well as Digital Studios & Marketing Agencies.

We also incubate  promising internal projects such as [Fitness Ventures](https://forum.trondao.org/t/fitness-ventures-launch-a-real-life-fitness-group-on-the-blockchain/4382)
![Builder's DAO Image 1](https://bttc-builders-dao.vercel.app/images/analyst-typing.jpg)
There is demand for our business. According to [TechCrunch](https://techcrunch.com/2022/07/14/nft-brand-loyalty-platform-hang-banks-16-million-from-paradigm/):

> Web3 startup [Hang](https://www.hang.xyz/) is one such startup looking to build up a client base of brands and help them leverage NFTs to replace their existing membership and loyalty programs

We explore these use cases further in our blog post, [**Use Cases for Utility & Programmable NFTs**](https://codesport.io/blockchain/dao/use-cases-for-programmable-and-utility-nfts/)


**Project Details**: 
Our goal is to encourage the use of NFTs as primitives to provide awards, prizes, and incentices for loyalty programs, blockchain-based credentialing (e.g., memberships), proof of provenance, proof of work (completed labor), and proof of attendance (of events).

We see NFTs as tokenized **React Applications**. Novel features of such NFTs include:

1. Programmable payments (e.g. salaries, dividends, interest, awards, etc.)
2. Access control functionality (membership)*
3. Governance (Voting) via an ERC-721 DAO
4. Dynamic QR Codes
5. Payment Escrows
6. Brick and mortar payments integration (QR code scanning and crypto wallet integration)
7. Mini E-Commerce Stores 

**Project Milestones & Features**: 

* [55-day Roadmap](https://codesport.io/blockchain/dao/dao-buildout-may-23-july-15#roadmap)
* [Roadmap: DAO Buildout June 21 to June 28](https://codesport.io/blockchain/dao/roadmap-dao-buildout-june-21-to-june-28/)
* [Roadmap: DAO Buildout July 5 to July 15](https://codesport.io/blockchain/dao/roadmap-dao-buildout-july-5-to-july-15/)
* [Building a Core Dev Team & Incentivizing the Right Behaviors](https://codesport.io/business-strategy/daos-incentivizing-the-right-behaviors/)

### Bug Fixes

**1.** Allow finance pages to be viewed by users without Metamask wallets. That is, `window.ethereum == undefined`

**2.** The frontend code for the `vote` button is broken. Also, we need to add timer/countdown until voting period expires.


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
