const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect("mongodb://localhost/howdyNeighbourDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});



const assetSeed = [
  {
    name:"Hammer",
    category:"Tools",
    description:"A Hammer",
    hourlyPrice:"10",
    dailyPrice:"1",
    user_id: "5f58552ad578bb54a0ca401d"
  },
  {
    name: "Rammer",
    category: "Tools",
    description: "A Rammer",
    hourlyPrice: "10",
    dailyPrice: "1",
    user_id: "5f58552ad578bb54a0ca401d"
  },
  {
    name:"Watchimacallit",
    category:"Tools",
    description:"A Watchimacallit",
    hourlyPrice:"10",
    dailyPrice:"1",
    user_id:"5f585a1686ba1e1d0c08ce43"
  },
  {
    name:"Spear",
    category:"Tools",
    description:"A Spear",
    hourlyPrice:"10",
    dailyPrice:"1",
    user_id:"5f585a1686ba1e1d0c08ce43"
  }

];


const userSeed = [

  
  {
    "_id" : "5f58552ad578bb54a0ca401d",
    "email" : "ben_d_coelho@hotmail.com",
    "password" : "$2a$10$vEbWVSaP.QIUJIEZosYFdu4YAq5XmGiFn7npaRu0L1xqAXCbWFpbi",
    "firstName" : "Benson",
    "lastName" : "Coelho",
    "streetNum": 8,
    "streetName": "James St",
    "suburb": "Glenhuntly",
    "state": "VIC",
    "geometry": {"coordinates": [145,37]}
},

{
  "_id" : "5f585a1686ba1e1d0c08ce43",
  "email" : "ben_d_coelho0@hotmail.com",
  "password" : "$2a$10$WxcaqblPmKynHDeHTMnclOXbl8DgJ5qDerrZm7VskmPSfihPWVRI2",
  "firstName" : "Benson",
  "lastName" : "Coelho",
  "streetNum": 10,
  "streetName": "James St",
  "suburb": "Glenhuntly",
  "state": "VIC",
  "geometry": {"coordinates": [145.1,37.1]}

}

];



db.User.deleteMany({})
  .then(() => db.User.insertMany(userSeed))
  .then(data => {

    console.log(data.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });



db.Asset.deleteMany({})
  .then(() => db.Asset.insertMany(assetSeed))
  .then(data => {
    console.log(data.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
