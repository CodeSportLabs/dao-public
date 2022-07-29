# Builder's DAO Public Repo

Our website is live and may be tested on:

* [Polygon's Mumbai Testnet](https://builders-dao.vercel.app/) 
* [BitTorrent Chain's Donau Testnet](https://bttc-builders-dao.vercel.app/)

View the resource library at: https://codesport.io/dao-public

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
