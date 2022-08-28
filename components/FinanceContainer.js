import { ethers } from "ethers";
import { useEffect, useState } from "react";
import {rounding, chainlink} from '../components/HelperFunctions'


import {
  CONTRACT_ADDRESS_MINTER,
  CONTRACT_ADDRESS_SPLIT_MAIN,
  CONTRACT_ADDRESS_SPLIT_RECIPIENT,
  CONTRACT_ADDRESS_TIMELOCK,
  CONTRACT_ADDRESS_USDC,
} from "../utils/constants";
import minterABI from "../utils/abi/Minter.json";
import usdcABI from "../utils/abi/USDC.json";
import splitMainABI from "../utils/abi/SplitMain.json";


const FinanceContainer = () => {
  const [ethereum, setEthereum] = useState(null);
  const [currentAccount, setCurrentAccount] = useState("");
  const [moneyMetadata, setMoneyMetadata] = useState([
    "No Payments Yet",
    "0.0",
    "0.0",
    "0.0",
    "0.0",
  ]);
  const [distributionHistory, setDistributionHistory] = useState([]);
    const [provider, setProvider] = useState({});
    const [signer, setSigner] = useState({});
    const [contractUSDC, setContractUSDC] = useState({});
    const [contractSplitMain, setContractSplitMain] = useState({});
    const [contractMinter, setContractMinter] = useState({});
    const [contractDAI, setContractDAI] = useState({});
    const [overrides, setOverrides] = useState({});

    const user1 = "0xF9c350Ec1f67c9D548Aec60D528d6e0A0C97c517";
    const user2 = "0x650Ac918C9e9C5F58f03C2845b2C11C438Ab5BF7"; 

    const isAdmin = ( user2.toUpperCase() === currentAccount.toUpperCase()  ||  user1.toUpperCase() === currentAccount.toUpperCase() )
    const isSuperAdmin = ( user2.toUpperCase() === currentAccount.toUpperCase() )

    //Mumbai
    const addressUSDC = "0xe11a86849d99f524cac3e7a0ec1241828e332c62"; //Swan Faucet
    const addressUSDC2 = "0x234201E48499b104321CB482BeB5A7ae5F3d9627"; //https://mumbai.polygonscan.com/token/0x234201e48499b104321cb482beb5a7ae5f3d9627
    const addressDAI = "0xa362893f40fcc2430b4d95c6f420e923d7d793e2";
    const address0xReceiveWallet = "0xAEDC3E203A84dB63926Bb775F3183D851a4D2a16"; //0xSplits Team Wallet
    const addressSplitMain = CONTRACT_ADDRESS_SPLIT_MAIN
    const addressMinter = CONTRACT_ADDRESS_MINTER 
    const addressTimeLock = CONTRACT_ADDRESS_TIMELOCK

 
  const users=[
    {
      address:"0x650Ac918C9e9C5F58f03C2845b2C11C438Ab5BF7",
      split:5e5
    },
        {
      address:"0xF9c350Ec1f67c9D548Aec60D528d6e0A0C97c517",
      split:5e5
    },
  
  ]


  //DAI FAUCET: https://mumbai.polygonscan.com/token/0xa362893f40fcc2430b4d95c6f420e923d7d793e2?a=0x341d1f30e77D3FBfbD43D17183E2acb9dF25574E#writeContract

  const abiSplitMain = splitMainABI.abi;
  const abiMinter = minterABI.abi;
  const abiUSDC = usdcABI;
  const abiERC20 = [
    "function name() view returns (string name)",
    "function symbol() view returns (string symbol)",
    "function decimals() view returns (uint8 decimals)",
    "function balanceOf(address owner) view returns (uint256)",
    "function transfer(address recipient, uint256 amount) public returns (bool)",
    "function allowance(address owner, address spender) view returns (uint256)",
    "function approve(address spender, uint256 amount) public returns (bool)",
    "event Transfer(address indexed from, address indexed to, uint amount)",
    "event Approval(address indexed owner, address indexed spender, uint256 value)",
  ];

  /**
   * Get balance due for connected wallet
    */
    const getUserMetadata = async () => {
    // try {
    //  const { ethereum } = window;
    if (ethereum) {
        const controllerAddress = await contractSplitMain.getController(
        address0xReceiveWallet
        );

        const zeroSplitsBalanceDAI = ethers.utils.formatEther(
        await contractSplitMain.getERC20Balance(
            address0xReceiveWallet,
            addressDAI
        )
        );
        const zeroSplitsBalanceUSDC = ethers.utils.formatEther(
        await contractSplitMain.getERC20Balance(
            address0xReceiveWallet,
            addressUSDC
        )
        );
        const zeroSplitsBalanceNative = ethers.utils.formatEther(
        await contractSplitMain.getETHBalance(address0xReceiveWallet)
        );

        const minterBalanceNative = ethers.utils.formatEther(
        await provider.getBalance(addressMinter)
        );

        const minterBalanceUSDC = ethers.utils.formatEther(
        await contractUSDC.balanceOf(addressMinter)
        );      

        const timeLockBalanceNative = ethers.utils.formatEther(
        await provider.getBalance(addressTimeLock)
        );
        const timeLockBalanceUSDC = ethers.utils.formatEther(
        await contractUSDC.balanceOf(addressTimeLock)
        );
        const timeLockBalanceDAI = ethers.utils.formatEther(
        await contractDAI.balanceOf(addressTimeLock)
        );

        const timeLockBalancereleasableNative = ethers.utils.formatEther(
        await contractMinter["releasable(address)"](addressTimeLock)
        );
        const timeLockReleasableBalanceUSDC = ethers.utils.formatEther(
        await contractMinter["releasable(address,address)"](
            addressUSDC,
            addressTimeLock
        )
        );
        const timeLockReleasableBalanceDAI = ethers.utils.formatEther(
        await contractMinter["releasable(address,address)"](
            addressDAI,
            addressTimeLock
        )
        );

        let metadata = [
        controllerAddress,
        zeroSplitsBalanceDAI*1,
        zeroSplitsBalanceUSDC*1,
        zeroSplitsBalanceNative*1,
        Number(minterBalanceUSDC),
        minterBalanceNative,
        Number(timeLockBalanceUSDC),
        Number(timeLockBalanceNative),

        ];
        setMoneyMetadata(metadata);
        console.log("0xSplits DAI Balance: ", zeroSplitsBalanceDAI);
        console.log("0xSplits USDC Balance: ", zeroSplitsBalanceUSDC);
        console.log("0xSplits MATIC Balance: ", zeroSplitsBalanceNative);
        console.log("Minter Balance in Native Token: ", minterBalanceNative);
        console.log("Minter Balance in USDC: ", minterBalanceUSDC);      
        console.log("TimeLock Balance in Native Token: ", timeLockBalanceNative);
        console.log("TimeLock Balance in USDC Token: ", timeLockBalanceUSDC);
        console.log("TimeLock Balance in DAI Token: ", timeLockBalanceDAI);

        console.log("TimeLock USDC Releasable Balance: ", timeLockReleasableBalanceUSDC);
        console.log( "TimeLock Releasable Balance: ", timeLockBalancereleasableNative);
        // //https://docs.ethers.io/v5/single-page/#/v5/migration/web3/-%23-migration-from-web3-js--contracts--overloaded-functions
    } else {
        console.log("Ethereum object doesn't exist!");
    }
    };


//https://docs.0xsplits.xyz/sdk#updatesplit
// https://docs.0xsplits.xyz/sdk#getsplitmetadata  

  const handleWithdraw = async (event) => {
    try {
      if (ethereum) {
        const gasPrice = await provider.getGasPrice();
        console.log("Gas Price Estimate:", gasPrice.toString());

        let ERC20Array =[]

        if (moneyMetadata[1] !== 0){
            ERC20Array.push(addressDAI)
            console.log('handleWithdraw DAI', moneyMetadata[1])
        }

        if (moneyMetadata[2] !== 0){
            ERC20Array.push(addressUSDC)
            console.log('handleWithdraw USDC', moneyMetadata[2])
        }

        console.log(ERC20Array)
        const tx = await contractSplitMain.withdraw( currentAccount, 1, ERC20Array , overrides );

        console.log("Mining..." + tx.hash);
        console.log(`View Tx Progress at: https://mumbai.polygonscan.com/tx/${tx.hash}`)
        // await tx.wait();
        // console.log("Success! Mining Complete..." + tx.hash)

        const receipt = await tx.wait();

        const gasUsed = receipt.gasUsed;
        const effectiveGasPrice = receipt.effectiveGasPrice;
        const txFee = gasUsed.mul(effectiveGasPrice);

        console.log("Success! Mining Complete..." + tx.hash);
        console.log("...Gas Used: " + txFee);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDistributeDAI = async (event) => {
    try {
      if (ethereum) {
        let tx = await contractSplitMain.distributeERC20(
          address0xReceiveWallet,
          addressDAI,
          [users[0].address, users[1].address],
          [users[0].split, users[1].split],
          1e4,
          currentAccount,
          overrides
        );
        console.log("Mining..." + tx.hash);
        console.log(`View Tx Progress at: https://mumbai.polygonscan.com/tx/${tx.hash}`)

        // await tx.wait();
        // console.log("Success! Mining Complete..." + tx.hash)
        const receipt = await tx.wait();

        const gasUsed = receipt.gasUsed;
        const effectiveGasPrice = receipt.effectiveGasPrice;
        const txFee = gasUsed.mul(effectiveGasPrice);

        console.log("Success! Mining Complete..." + tx.hash);
        console.log("...Gas Used: " + txFee);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDistributeUSDC = async (event) => {
    try {
      if (ethereum) {
        let tx = await contractSplitMain.distributeERC20(
          address0xReceiveWallet,
          addressUSDC,
         [users[0].address, users[1].address],
          [users[0].split, users[1].split],
          1e4,
          currentAccount,
          overrides
        );
        console.log("Mining..." + tx.hash);
        console.log(`View Tx Progress at: https://mumbai.polygonscan.com/tx/${tx.hash}`)

        const receipt = await tx.wait();

        const gasUsed = receipt.gasUsed;
        const effectiveGasPrice = receipt.effectiveGasPrice;
        const txFee = gasUsed.mul(effectiveGasPrice);

        console.log("Success! Mining Complete..." + tx.hash);
        console.log("...Gas Used: " + txFee);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDistributeNative = async (event) => {
    try {
      if (ethereum) {
        let tx = await contractSplitMain.distributeETH(
          address0xReceiveWallet,
         [users[0].address, users[1].address],
          [users[0].split, users[1].split],
          1e4,
          currentAccount,
          overrides
        );
        console.log("Mining..." + tx.hash);
        console.log(`View Tx Progress at: https://mumbai.polygonscan.com/tx/${tx.hash}`)

        const receipt = await tx.wait();

        const gasUsed = receipt.gasUsed;
        const effectiveGasPrice = receipt.effectiveGasPrice;
        const txFee = gasUsed.mul(effectiveGasPrice);

        console.log("Success! Mining Complete..." + tx.hash);
        console.log("...Gas Used: " + txFee);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };


    const handleTimeLockRelease = async (event) => {
    try {
      if (ethereum) {
        let tx = await contractMinter["release(address)"](addressTimeLock);
        console.log("Mining..." + tx.hash);
        console.log(`View Tx Progress at: https://mumbai.polygonscan.com/tx/${tx.hash}`)

        const receipt = await tx.wait();

        const gasUsed = receipt.gasUsed;
        const effectiveGasPrice = receipt.effectiveGasPrice;
        const txFee = gasUsed.mul(effectiveGasPrice);

        console.log("Success! Mining Complete..." + tx.hash);
        console.log("...Gas Used: " + txFee);

        getUserMetadata();
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };



  const handleTimeLockDeposit = async (event) => {
    event.preventDefault();

    const string = event.target.invest.value.toString();
    try {
      if (ethereum) {
        let tx = await signer.sendTransaction({
          to: addressTimeLock,
          value: ethers.utils.parseEther(string),
        });

        console.log("Mining..." + tx.hash);
        // await tx.wait();
        // console.log("Success! Mining Complete..." + tx.hash)
        const receipt = await tx.wait();

        const gasUsed = receipt.gasUsed;
        const effectiveGasPrice = receipt.effectiveGasPrice;
        const txFee = gasUsed.mul(effectiveGasPrice);

        console.log("Success! Mining Complete..." + tx.hash);
        console.log("...Gas Used: " + txFee);

        getUserMetadata();
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };


    const handleTeamWalletDeposit = async (event) => {

        event.preventDefault();
        let tx
        const amount = event.target.pay.value.toString();
        const token = event.target.token.value.toString();
       

        try {

            if (ethereum) {

            switch (token) {
                case "dai":
                    const currentAccountDAIBalance  = await contractDAI.balanceOf(currentAccount)

                    if (ethers.utils.formatEther(currentAccountDAIBalance) *1 >= amount* 1 ){
                         tx = await contractDAI.transfer( address0xReceiveWallet, ethers.utils.parseEther(amount) )
                    } else{
                    console.log(ethers.utils.formatEther(currentAccountDAIBalance) *1 )
                        alert("Your Wallet Doesn't  Have Enough DAI")
                    }
                    break;
                    
                case "usdc":
                    const currentAccountUSDCBalance  = await contractUSDC.balanceOf(currentAccount)
                    if ( ethers.utils.formatEther(currentAccountUSDCBalance) *1 >= amount* 1  ){
                        tx = await contractUSDC.transfer( address0xReceiveWallet, ethers.utils.parseUnits(amount, 18) )
                    } else{
                    console.log(ethers.utils.formatEther(currentAccountUSDCBalance) *1 )
                    alert("Your Wallet Doesn't  Have Enough USDC")
                    }
                    break;
            
                default:
                    const currentAccountNativeBalance = await provider.getBalance(currentAccount)
                    if ( ethers.utils.formatEther(currentAccountNativeBalance) *1 >= amount* 1  ){
                        tx = await signer.sendTransaction({ to: address0xReceiveWallet, value: ethers.utils.parseEther(amount) })
                    } else{
                        alert("Your Wallet Doesn't  Have Enough Native Token")
                    }
            }
                await tx.wait() 
            
                console.log("Sending to Team Wallet: Mining Tx..." + tx.hash);
                console.log(`View Tx Progress at: https://mumbai.polygonscan.com/tx/${tx.hash}`)
                // await tx.wait();
                // console.log("Success! Mining Complete..." + tx.hash)
                const receipt = await tx.wait();

                const gasUsed = receipt.gasUsed;
                const effectiveGasPrice = receipt.effectiveGasPrice;
                const txFee = gasUsed.mul( effectiveGasPrice );

                console.log("Success! Mining Complete..." + tx.hash);
                console.log("...Gas Used: " + txFee);

                getUserMetadata();
            } else {
                console.log("Ethereum object doesn't exist!");
            }

        } catch (error) {

            console.log(error);
            
        }

    }


    const handleMinterDeposit = async (event) => {
        event.preventDefault();

        const string = event.target.donate.value.toString();
        try {
            if (ethereum) {
                const tx = await signer.sendTransaction({
                to: addressMinter,
                value: ethers.utils.parseEther(string),
                });

                console.log("Send to Team Minter: Mining..." + tx.hash)
                console.log(`View Tx Progress at: https://mumbai.polygonscan.com/tx/${tx.hash}`)
                // await tx.wait();
                // console.log("Success! Mining Complete..." + tx.hash)
                const receipt = await tx.wait();

                const gasUsed = receipt.gasUsed;
                const effectiveGasPrice = receipt.effectiveGasPrice;
                const txFee = gasUsed.mul(effectiveGasPrice);

                console.log("Success! Mining Complete..." + tx.hash);
                console.log("...Gas Used: " + txFee);

                getUserMetadata();
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
        console.log(error);
        }
  };


    const handleWithdrawMinter = async (event) => {
        event.preventDefault();

        //const string = event.target.amount.value.toString();
        try {
            if (ethereum) {

                let tx
                let minterUSDCBalance  = await contractUSDC.balanceOf(addressMinter)
                let minterDAIBalance  = await contractDAI.balanceOf(addressMinter)
                let minterNativeBalance = await provider.getBalance(addressMinter)


            if ( ethers.utils.formatEther(minterNativeBalance.toString()) >0 ){
                tx = await contractMinter.withdraw( user2, minterNativeBalance  ) 
                console.log("Sending to Super User: Mining..." + tx.hash);
                console.log(`View Tx Progress at: https://mumbai.polygonscan.com/tx/${tx.hash}`)            
                await tx.wait();
                console.log("Success! Mining Complete..." + tx.hash);}

            if ( ethers.utils.formatEther(minterUSDCBalance.toString()) >0 ){
                tx = await contractMinter.withdrawERC20( addressUSDC,  user2, minterUSDCBalance )
                console.log("Sending to Super User: Mining..." + tx.hash);
                console.log(`View Tx Progress at: https://mumbai.polygonscan.com/tx/${tx.hash}`)
                await tx.wait();
                console.log("Success! Mining Complete..." + tx.hash);
            }

            if ( ethers.utils.formatEther(minterBalanceDAI.toString()) >0 ){
                tx = await contractMinter.withdrawERC20( addressDAI,  user2, minterDAIBalance )
                console.log("Sending to Super User: Mining..." + tx.hash);
                console.log(`View Tx Progress at: https://mumbai.polygonscan.com/tx/${tx.hash}`)
                await tx.wait();
                console.log("Success! Mining Complete..." + tx.hash);
            }
                
                getUserMetadata();
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
        console.log(error);
        }
  };

  //This returns some weird address. I think it's a proxy contract. Either way, it seems useless
  const handleGetWalletAddress = async (event) => {
    try {
      if (ethereum) {
        const tx = await contractSplitMain.walletImplementation();
        console.log(tx);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      //   const { ethereum } = window;

      if (!ethereum) {
        console.log("Finance Page Msg: Make sure you have metamask!");



        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0]; //redundant. can refactor
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);

      getUserMetadata();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    getUserMetadata();

    // https://github.com/ethers-io/ethers.js/issues/726
    // TODO: understand Justin's Workaorund for: windows.ethereum ref Error:
    //   const [provider, setProvider] = useState({})
    //...
    //   useEffect(() => {
    //        setProvider(new ethers.providers.Web3Provider(window.ethereum))
    //   }, []);


    setEthereum(window.ethereum);
    let provider
    if (window.ethereum){
        provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
    } else{
         provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com/")
        const signer = '';
    }

    
    const contractUSDC = new ethers.Contract(addressUSDC, abiUSDC, signer);
    const contractSplitMain = new ethers.Contract(
      addressSplitMain,
      abiSplitMain,
      signer
    );
    const contractMinter = new ethers.Contract(
      addressMinter,
      abiMinter,
      signer
    );
    const contractDAI = new ethers.Contract(addressDAI, abiERC20, signer);

    setOverrides({
      //https://ethereum.stackexchange.com/a/93559/3506
      // value: price,ether in this case MUST be a string
      gasLimit: ethers.utils.hexlify(500000),
    });



    // TODO: These are global variables in the component.  
    // Why do we need to set them as state variables?
    setProvider(provider);
    setSigner(signer);
    setContractUSDC(contractUSDC);
    setContractSplitMain(contractSplitMain);
    setContractMinter(contractMinter);
    setContractDAI(contractDAI);
  }, [ethereum]);

  /**
   * Listen in for emitter events!
   */
  useEffect(() => {
    // NB: contract on/off is an event listener declared in the smart contract as Event => emit.

    let contract;

    // event DistributeETH(address indexed split, uint256 amount, address indexed distributorAddress)
    // event DistributeERC20(address indexed split, contract ERC20 indexed token, uint256 amount, address indexed distributorAddress)
    const onDistributeERC20 = (split, token, amount, distributorAddress) => {
      console.log(
        "New ERC20 sent from ",
        split,
        " containing token address of ",
        token,
        "in the amount of",
        amount
      );

      setDistributionHistory((prevState) => [
        ...prevState,
        {
          splitterAddress: split,
          erc20Address: token,
          amount: amount,
          feeRecipient: distributorAddress,
        },
      ]);
    };

// Listener 
    // if (window.ethereum) {
    //   const provider = new ethers.providers.Web3Provider(window.ethereum);
    //   const signer = provider.getSigner();

    //   contract = new ethers.Contract(addressSplitMain, abiSplitMain, signer);
    //   contract.on("DistributeERC20", onDistributeERC20);
    // }

    // return () => {
    //   if (contract) {
    //     contract.off("DistributeERC20", onDistributeERC20);
    //   }
    // };
  }, []);

  let metamaskButton = null;

  if (!currentAccount) {
    metamaskButton = (
      <button
        className="bg-slate-600 text-white px-2 py-1 rounded-md"
        onClick={connectWallet}
      >
        Connect Wallet
      </button>
    );
  }

  let history = null;
  if (distributionHistory.length !== 0) {
    history = distributionHistory.map((singleItem, index) => (
      <div
        key={index}
        style={{
          backgroundColor: "OldLace",
          marginTop: "16px",
          padding: "8px",
        }}
      >
        <div>Splitter Address: {singleItem.splitterAddress}</div>
        <div>Token Address: {singleItem.erc20Address}</div>
        <div>Amount Distributed: {singleItem.amount}</div>
      </div>
    ));
  } 

  return (
    <>
      <div className="flex flex-col justify-center p-5 lg:p-10 text-start gap-2 bg-slate-200 rounded-xl">
        <div className="flex flex-col gap-5 w-full">
          {metamaskButton}

          <h2 className="font-bold text-lg text-slate-500">
            Payments Available to Distribute from Team Wallet
          </h2>
          <ul className="flex flex-col gap-2  text-slate-700">
            
            <li>
              <strong>DAI Balance...........</strong> $
              {(moneyMetadata[1] * 1).toFixed(2)}{" "}
              {moneyMetadata[1] !==0 && (
                <button
                  className="ml-2 bg-slate-600 text-white px-2 py-1 rounded-md"
                  onClick={handleDistributeDAI}
                >
                  Distribute DAI to Team
                </button>
              )}
            </li>

            <li>
              <u>
                <strong>USDC Balance.......</strong>{" "}
                {(moneyMetadata[2] * 1).toFixed(2)}
              </u>{" "}
              {moneyMetadata[2] !==0 && (
                <button
                  className="ml-2 bg-slate-600 text-white px-2 py-1 rounded-md"
                  onClick={handleDistributeUSDC}
                >
                  Distribute USDC to Team
                </button>
              )}
            </li>
            <li className="font-bold">TOTAL BALANCE: ${moneyMetadata[1] + moneyMetadata[2]} USD</li>
            
            <hr className="m-auto bg-slate-600 my-3 w-1/2" />
            <li className="text-slate-600">
                <strong>MATIC Balance...........</strong>{" "}
                {(moneyMetadata[3]* 1).toFixed(2)}
              {" "}
              {moneyMetadata[3] !==0 && (
                <button
                  className="ml-2 bg-slate-600 text-white px-2 py-1 rounded-md"
                  onClick={handleDistributeNative}
                >
                  Distribute MATIC to Team
                </button>
              )}
            </li>      
            </ul>
            
       {  isAdmin && 
                
                 <div className='flex items-center justify-center m-3'>
                    <button  className="bg-slate-600 text-white px-2 py-1 rounded-md"  onClick={handleWithdraw}>
                         Withdraw My Share of Tot. Balance
                    </button>
                
                </div> }
            <hr className="border-2 border-slate-500"/>
           
            {/* <div className="text-center font-bold">Governance Contract Balances</div> */}

            <div className="font-bold text-lg text-slate-500">Governance Contract Balances</div>

<ul className="flex flex-col gap-2 text-slate-700">
            {/* <li><b className="font-bold">Controller Address:</b> {splitterMetadata[0]}</li> */}
            <li>
              <b className="font-bold">Minter Balance......... </b>
              {(moneyMetadata[5] *1 ).toFixed(3)} MATIC
              {moneyMetadata[5]*1 !== 0 && (
                <button
                  className="ml-2 bg-slate-600 text-white px-2 py-1 rounded-md"
                  onClick={handleTimeLockRelease}
                >
                  Release to TimeLock
                </button>
              )}
            </li>

            <li className=" underline">
             
                <b className="font-bold">TimeLock Balance....</b>{" "}
                {(moneyMetadata[7] * 1).toFixed(3)} MATIC
              
            </li>
            <b className="font-bold">
              TOTAL BALANCE....... {(moneyMetadata[5] *1 + moneyMetadata[7]*1 ).toFixed(3)}{" "}  MATIC
            </b></ul>

       {  isSuperAdmin && 
                
                 <div className='flex items-center justify-center m-3'>
                    <button  className="bg-slate-600 text-white px-2 py-1 rounded-md"  onClick={handleWithdrawMinter}>
                         Drain Minter
                    </button>
                
                </div> 
                }


             <hr className="border-2 border-slate-500" />
            <span className="">
                <input type="checkbox" name="agree" id="agree" className="peer" /><label htmlFor="agree" className="ml-3 inline  text-slate-700 font-semibold">Pay Team for Dev Services</label>
            
                <div className="flex-col gap-2 hidden peer-checked:block" >
               
              <h2 className="mt-5 font-bold text-lg text-slate-500">
              Payment Options
            </h2>
            
              {/* <form
                id="invest"
                onSubmit={handleTimeLockDeposit}
                className="flex gap-2"
              >
                <button
                  className="bg-slate-600 text-white px-2 py-1 rounded-md"
                  form="invest"
                  
                >
                  Send Matic to Timelock
                </button>
                <input
                  type="number"
                  name="invest"
                  form="invest"
                  min=".001"
                  step=".001"                  
                  placeholder="Amount"
                  className="px-2 rounded-md"
                  required
                />
              </form>
              
                         
            <form
                id="donate"
                onSubmit={handleMinterDeposit}
                className="flex gap-2"
              >
                <button
                  className="bg-slate-600 text-white px-2 py-1 rounded-md"
                  form="donate"
                >
                  Send Matic to Minter
                </button>
                <input
                  type="number"
                  name="donate"
                  form="donate"
                  min=".001"
                  step=".001"
                  placeholder="Amount"
                  className="px-2 rounded-md"
                  required
                />
            </form> */}
            
            <form
                id="pay"
                onSubmit={handleTeamWalletDeposit}
                className="flex gap-2 break-words mt-5"
              >
                <button
                  className="bg-slate-600 text-white px-2 py-1 rounded-md md:w-max"
                  form="pay" 
                >
                  Send Token  <span className="hidden md:inline">to Team Wallet</span>
                </button>
                <input
                  type="number"
                  name="pay"
                  form="pay"
                  min=".001"
                  step=".001"
                  size="5"
                  placeholder="Amnt"
                  className="px-2 rounded-md w-20"
                  required
                />
                <select id="" className="px-2 rounded-md w-24   " name="token" required>
                            <option value="" defaultValue disabled selected>-Token-</option>
                            <option value="dai">DAI</option>
                            <option value="native">MATIC</option>
                            <option value="usdc">USDC</option>
                                                   
                </select>
            </form>

            </div></span></div>
{/* 
            <li>
              <strong>Native Token Balance:</strong>{" "}
              {moneyMetadata[3]} Matic{" "}
              {moneyMetadata[3] !==0 && (
                <button
                  className="ml-2 bg-slate-600 text-white px-2 py-1 rounded-md"
                  onClick={handleDistributeNative}
                >
                  Distribute to Team
                </button>
              )}
            </li> */}
         

          {history}


        </div>

    </>
  );
};

export default FinanceContainer;
