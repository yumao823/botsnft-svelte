const ethers = require('ethers');
const faunadb = require('faunadb');
const fs = require("fs");
const { abi } = require('./SpacePepe.json')
var CryptoJS = require("crypto-js");

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

function returnError(message, statusCode = 400) {
  return {
    statusCode,
    body: JSON.stringify({ error: message })
  }
}

function returnSuccess(data, statusCode = 200) {
  return {
    statusCode,
    body: JSON.stringify(data)
  }
}
exports.handler = async function(event) {
    provider = await ethers.getDefaultProvider(process.env.ALCHEMY_KEY)
    const nftContract = new ethers.Contract(process.env.NFT_CONTRACT_ADDRESS, abi, provider);
    var currentNft = await nftContract.currentTokenId();
    currentNft = parseInt(currentNft.toString())
    
    try {
        const ref = await client.query(q.Paginate(q.Match(q.Index('eth_guracorp_by_id')), {size:100} ) )
        if(ref.data.length == 0) {
            return returnError('No pepes');
        }
        pepes = ref.data
        return returnSuccess(pepes.slice(0,currentNft));
    }
    catch(error) {
        console.log(error)
        return returnError('DB Error')
    }
}
