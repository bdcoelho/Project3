const fs = require("fs");

let assets = JSON.parse(fs.readFileSync("seed_asset_id.json").toString());
let users = JSON.parse(fs.readFileSync("seed_user_id.json").toString());
// users[i].assets = [];

assetSet = [];
newUsers = [];

for (let index = 0; index < assets.length; index++) {
  let asset = assets[index];
  let user_id = asset.user_id;
    let asset_id = asset._id;
    // console.log(asset_id)
  for (let i = 0; i < users.length; i++) {

    if (users[i]._id === user_id) {
        if(!users[i].assets){

            users[i].assets = [];
        }
      users[i].assets.push(asset_id);
    }
  }
}

let outputFile = JSON.stringify(users);

fs.writeFileSync("user.json", outputFile, (err) => {
  if (err) {
    throw err;
  }
});
