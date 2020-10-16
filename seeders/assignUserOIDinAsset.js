const fs = require("fs");


let assets = JSON.parse(fs.readFileSync("seed_asset_id.json").toString());
// assets[i].assets = [];




  for (let i = 0; i < assets.length; i++) {
let assetUserId = assets[i].user_id
let newAssetUserId= {"$oid":assetUserId}
assets[i].user_id=newAssetUserId

  }


let outputFile = JSON.stringify(assets);

fs.writeFileSync("asset2.json", outputFile, (err) => {
  if (err) {
    throw err;
  }
});
