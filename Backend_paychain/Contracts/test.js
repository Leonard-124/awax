const { ethers } = require("ethers")

require('dotenv').config()



const URL = process.env.ALCHEMY_API_KEY

const provider = new ethers.JsonRpcProvider(URL)


