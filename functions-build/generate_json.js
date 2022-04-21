const ethers = require('ethers');
const faunadb = require('faunadb');
const fs = require("fs");
var CryptoJS = require("crypto-js");


const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

//thanks esmiralha
//https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript

function sanitize(str) {
  return str.replace(/\//g, 's').replace(/\+/g, 'p');
}
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
var metadata = {
  "name": "Guracorp",
  "description": "100 GURA® NFT is a collection designed to celebrate a bespoke vision from the future. Where passion for ScienceFiction fuses with Aesthetics and a new wave of mechanical sophistication enters the world. With a touch of personal character, we Introduce a batch of robots. Every one of them, Unique & Serialized.",
  "image": 'https://guranft.com/guras/',
  "external_url": 'https://guranft.com/guras/'
};

exports.handler = async function(event) {
    var pepes;
    try {
        const ref = await client.query(q.Paginate(q.Match(q.Index('eth_guracorp')), {size:100} ) )
        if(ref.data.length == 0) {
            return returnError('No pepes');
        }
        res = await client.query(ref.data.map(n => q.Get(n)))
        pepes = res.map(n => n.data);
    }
    catch(error) {
        console.log(error)
        return returnError('DB Error')
    }

    pepes.forEach((v, i) => { 
        var meta = {};
        Object.assign(meta, metadata);
        meta['name'] += ' #' + v['nftId']
        console.log(meta['name'])
        meta['image'] += v['image']
        meta['external_url'] += v['nftId']
        meta = JSON.stringify(meta);
        
        fs.writeFile('./public/json/' + v['nftId'], meta, 'utf8', () => {})

    })
    return returnSuccess([])
}


