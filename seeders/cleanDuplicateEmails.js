const fs = require("fs");


let users = JSON.parse(fs.readFileSync("user2.json").toString());
// users[i].assets = [];


emailArray=[]

  for (let i = 0; i < users.length; i++) {
let userEmail = users[i].email

if(emailArray.includes(userEmail)){
let newUserEmail= Math.round(Math.random()*999)+userEmail
users[i].email=newUserEmail
}
emailArray.push(userEmail);
  }


let outputFile = JSON.stringify(users);

fs.writeFileSync("user3.json", outputFile, (err) => {
  if (err) {
    throw err;
  }
});
