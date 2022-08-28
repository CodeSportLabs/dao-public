import abi from "../utils/abi/chainlink.json"
import { ethers } from "ethers"

// https://stackoverflow.com/a/23560569/946957  alt: https://stackoverflow.com/a/32605063/946957
function rounding(number, precision) {
	return (+(Math.round(+(number + "e" + precision)) + "e" + -precision)).toFixed(precision)
}

/**
 * Chainlink Datafeeds
 * @link https://docs.chain.link/docs/get-the-latest-price/
 * @link https://docs.chain.link/get-latest-price.js
 * @link https://docs.chain.link/docs/matic-addresses/
 * @link https://docs.chain.link/docs/harmony-price-feeds/
 */
const chainlink = async (pair) => {


	const tradePairsMainnet = [
		{ DAI_USD: "0x4746DeC9e833A82EC7C2C1356372CcF2cfcD2F3D" }, //Polygon Mainnet
		{ ETH_USD: "0xF9680D99D6C9589e2a93a78A04A279e509205945" },
		{ MATIC_USD: "0xAB594600376Ec9fD91F8e885dADF0CE036862dE0" },
		{ USDC_USD: "0xfE4A8cc5b5B2366C1B58Bea3858e81843581b2F7" },
		{ ONE_USD: "0xdCD81FbbD6c4572A69a534D8b8152c562dA8AbEF" }, //Harmony Mainet
	]

	let rate
	let addr
	switch (pair) {
		case "DAI_USD":
			addr = tradePairsMainnet[0].DAI_USD
			break

		case "ETH_USD":
			addr = tradePairsMainnet[1].ETH_USD
			break

		case "MATIC_USD":
			addr = tradePairsMainnet[2].MATIC_USD
			break

		case "USDC_USD":
			addr = tradePairsMainnet[3].USDC_USD
			break

		case "ONE_USD":
			addr = tradePairsMainnet[4].ONE_USD
			break

		default:
			break
	}

	let provider
	if (pair !== "ONE_USD") {
		provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com/")
	} else {
		provider = new ethers.providers.JsonRpcProvider("https://api.harmony.one")
	}

	const aggregatorV3InterfaceABI = abi
	const priceFeed = new ethers.Contract(addr, aggregatorV3InterfaceABI, provider)

	rate = await priceFeed.latestRoundData()
	rate = (1 / rate.answer.toString()) * 1e8

	return rate
}



export { rounding, chainlink }
