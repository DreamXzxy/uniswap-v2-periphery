import hre from 'hardhat'
const { ethers } = hre
import { BigNumber } from 'ethers/lib/ethers'

export function expandTo18Decimals(n: number): BigNumber {
  return BigNumber.from(n).mul(BigNumber.from(10).pow(18))
}

async function deployUniswapV2Router02() {
  const [wallet] = await ethers.getSigners()
  console.log("deployer.address: ", wallet.address)

  const uniswapV2Router02Factory = await ethers.getContractFactory('UniswapV2Router02')
  const uniswapV2Router02 = await uniswapV2Router02Factory.deploy('_factory address', '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6')
  await uniswapV2Router02.deployed()

  console.log("uniswapV2Router02 address: ", uniswapV2Router02.address)
}

async function deployERC20() {
  const [wallet] = await ethers.getSigners()
  console.log("deployer.address: ", wallet.address)

  const totalSupply = expandTo18Decimals(1000000000) // 1b
  console.log(totalSupply, 'totalSupply')

  const erc20Factory = await ethers.getContractFactory('ERC20')
  const token = await erc20Factory.deploy(totalSupply)
  await token.deployed()

  console.log("test token address: ", token.address)
}

async function main() {
  await deployUniswapV2Router02()
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
