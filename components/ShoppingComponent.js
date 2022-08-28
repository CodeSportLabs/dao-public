/* eslint-disable @next/next/no-img-element */
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import {rounding, chainlink} from './HelperFunctions'

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS_MINTER } from "../utils/constants";
import minterABI from "../utils/abi/Minter.json";

const ShoppingComponent = () => {

    const [matic, setMatic] = useState()

    const price = 55
    const [output, setOutput] = useState([]);
    const [contractMinter, setContractMinter] = useState({});
    const [buyNow, setBuyNow] = useState(null)
   
     const getPriceInMatic = async () =>{
            const precision = 4
            let dirtyNum = (rounding( await chainlink("MATIC_USD"), precision) * price) 

            setMatic( dirtyNum.toFixed(4).toString())
    }

    console.log("Price out: ", matic)
    const handleBuyNow = async () =>{
        
        console.log("Price inside: ", matic)
        try{
            let tx = await contractMinter.deposit(  {value: ethers.utils.parseEther(matic), gasLimit: ethers.utils.hexlify(5000000)});
            console.log("Mining...", tx.hash);
            await tx.wait();
            console.log("Mined -- ", tx.hash)

        }catch(error){

            console.log(error)
            
        }

    } 
    
    useEffect(() => {
        getPriceInMatic()

        if (window.ethereum){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contractMinter = new ethers.Contract(
            CONTRACT_ADDRESS_MINTER,
            minterABI.abi,
            signer
            );

            setContractMinter(contractMinter);
            setBuyNow(<button className="bg-emerald-500 text-white px-2 py-1 rounded-md"onClick={handleBuyNow}>Buy with Matic</button>)
        }

    }, [matic])

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-10">
        <div className="md:flex">
            <div className="md:shrink-0">
            <a href="/images/polygon-couple-736.webp">
                <img className="h-48 w-full object-cover md:h-full md:w-48" src="/images/polygon-couple-736.webp" alt="Loving couple!" />
            </a>
            </div>
            <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-center md:text-lg text-indigo-500 font-bold">Buy Now! Polygon Couples T-shirt!</div>
            {/* <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Finding customers for your new business</a> */}
            <p className="mt-2 text-slate-500">Join and support fellow Web3 entreprenurs! Buy a Polygon couples t-shirt.</p>
            </div>
        </div>
        </div>

    <div className="text-center uppercase tracking-wide text-lg text-white font-bold mb-3">Buy 2 T-shirts for ${price} USD ({matic} MATIC) {buyNow}</div>
        <div className="relative flex flex-col break-words mb-6 shadow-lg rounded-lg bg-slate-200 p-5 w-max min-w-[356px]">
          <PaymentForm
            applicationId="sandbox-sq0idb-BYyf0nR_5QhBvSh7HBHQjg"
            locationId="LNVDS98N15M3Z"
            cardTokenizeResponseReceived={async (token, buyer) => {
            //   setOutput(JSON.stringify(token, null, 2));

                const response = await fetch('/api/pay', {
                  method:'POST',
                  headers: {
                      'Content-type': 'application/json'
                  },
                  body:JSON.stringify({sourceId:token.token})

              })

                let output = await response.json()

                console.log(output)

                output = [output.payment.totalMoney.amount,output.payment.totalMoney.currency,
                output.payment.orderId, 
                output.payment.receiptNumber,
                output.payment.updatedAt,]

              setOutput(output)


            }}
          >
            <CreditCard />
          </PaymentForm>

          <div className="max-w-sm">{output[0] && 
                    <>
                    <strong>Confirmed</strong><br />
                    Payment Date & Time: {output[4]} <br /> Receipt: {output[3]}  <br /> Amount: ${output[0]} {output[1]}  
                    </>
                    
        }</div>
        </div>
      </div>
    
    </>
  );
};

export default ShoppingComponent;
