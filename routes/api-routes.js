const passport = require("../Auth/passport");
const controller = require("../controllers/mainController");
const multer = require("multer");
const db = require("../models");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = (app) => {
  // Login routing
  app.post("/api/login", passport.authenticate("local"), controller.login);

  // Address search
  app.post("/api/addressSearch", controller.addressSearch);

  // Signup routing
  app.post("/api/signup", controller.signup);

  // Logging out routing
  app.get("/api/logout", controller.logout);

  // getting user data if they are logged in
  app.get("/api/user_data", controller.getUserData);

  // Find all assets of a user
  app.get("/api/myAssets/:userId", controller.userAsset);

  // Add an asset
  app.post("/api/addAsset", controller.addAsset);

  // modify an asset
  app.post("/api/modifyAsset", upload.single("file"), function (req, res) {
    formJSON=JSON.parse(req.body.formData);
    const updateObj = {
      name: formJSON.name,
      description: formJSON.description,
      hourlyPrice: formJSON.hourlyPrice,
      dailyPrice: formJSON.dailyPrice,
      image: req.file.filename
    };
      db.Asset.findByIdAndUpdate(formJSON.id, updateObj)
        .then((response) => {
          
          res.json(response);
        
        
        }
        
        
        )
        .catch((err) => res.status(422).json(err));
  });

  // Delete an asset
  app.post("/api/deleteAsset", controller.deleteAsset);

  // Find Users Near
  app.post("/api/findItemsNear/", controller.findItemsNear);

  //Find items and categories
  app.get("/api/findCategories/", controller.findCategories);

  //Find items and categories
  app.get("/api/findItems/:category", controller.findItems);

  //Upload files
  app.post("/upload", controller.upload);
};
