const ethers = require('ethers');
const faunadb = require('faunadb');
const fs = require("fs");
const { abi } = require('./SpacePepe.json')

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
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    console.log(currentIndex);
    // While there remain elements to shuffle...
    while (currentIndex != 0 && currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      console.log(currentIndex + " to " + randomIndex);
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

exports.handler = async function(event) {
    provider = await ethers.getDefaultProvider(process.env.ALCHEMY_KEY)
    const nftContract = new ethers.Contract(process.env.NFT_CONTRACT_ADDRESS, abi, provider);
    var currentNft = await nftContract.currentTokenId();
    currentNft = parseInt(currentNft.toString())
    console.log(currentNft)
    var pepes;
    try {
        const ref = await client.query(q.Paginate(q.Range(q.Match(q.Index('eth_guracorp_by_id_with_ref')), currentNft+1,100), {size:100} ) )
        if(ref.data.length == 0) {
            return returnError('No pepes');
        }
        pepes = ref.data
    }
    catch(error) {
        console.log(error)
        return returnError('DB Error')
    }

    shuffle(pepes)

    pepes.forEach((v, i) => { 
        var meta = {};
        i = currentNft + i + 1
        Object.assign(meta, metadata);
        meta['name'] += ' #' + i
        
        meta['image'] += v[1]
        meta['external_url'] += i
        meta = JSON.stringify(meta);
        console.log(v[2])
        fs.writeFile('./public/json/new/' + i, meta, 'utf8', () => {})
        client.query(
            q.Update(
              q.Ref(q.Collection('guracorp_eth'), v[2]),
              { data: { nftId: i } },
            )
          )
    })
    return returnSuccess([])
}


