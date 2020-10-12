const fs = require("fs");


let users = JSON.parse(fs.readFileSync("user.json").toString());
// users[i].assets = [];


newUsers = [];


  for (let i = 0; i < users.length; i++) {
let userID = users[i]._id
let newUserId= {"$oid":userID}
users[i]._id=newUserId

  }


let outputFile = JSON.stringify(users);

fs.writeFileSync("user2.json", outputFile, (err) => {
  if (err) {
    throw err;
  }
});
