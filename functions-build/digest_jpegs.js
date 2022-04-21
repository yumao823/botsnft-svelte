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
  return str.replace(/\//g, 's').replace(/\+/g, 'p').replace(/\=/g, 'r');
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
  "name": "HEXELZ",
  "description": "Hexelz NFT is about complex geometries and art. It’s non generative, drawn piece by piece, inspired by the imaginative works of M C Escher. All art is based on a triangulation grid. Hexelz NFTs shows a colorful approach with visual illusions tricks. Called impossible objects, the art is about geometry, tessellations, and mathematics.",
  "image": 'https://hexelz.io/imgs/Hexelz/',
  "external_url": 'https://hexelz.io/hexelz/'
};

//53 special move to 1
exports.handler = async function(event) {
    var base_dir = './public/imgs/Hexelz/';
    var seed_dir = base_dir + 'Hexelz/'
    var id = 1;
    fs.readdir(seed_dir, async (err, items) => {
        for (const dirent of items) {
            var ext = dirent.split('.').pop();
            if(ext == 'png')
            {   var file_name = sanitize(CryptoJS.AES.encrypt(dirent, process.env.AES_KEY).toString().slice(-25))
                fs.copyFile(seed_dir + dirent, base_dir + file_name, (err) => {});
                console.log(file_name + " has been created")
                var meta = {};
                Object.assign(meta, metadata);
                meta['name'] += ' #' + id
                console.log(meta['name'])
                meta['image'] += file_name
                meta['external_url'] += id
                meta = JSON.stringify(meta);
                
                fs.writeFile('./public/json/' + id, meta, 'utf8', () => {})
                id += 1;
            }
          }
    });
    return returnSuccess('Done');
}


