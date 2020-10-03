const db = require("../models");

module.exports = app => {
    app.post("/api/weather", (req, res) => {
        db.WeatherWidget.create({
            userId: req.body.userId,
            xCoord: req.body.xCoord,
            yCoord: req.body.yCoord,
            location: req.body.location
        })
        .catch (err => {
            res.status(401).json(err)
        })
    });

    app.get("/api/weather", (req, res) => {
        db.WeatherWidget.find({}, (err, response) => {
            if (err) {
                console.log(err)
            }
            res.json(response);
        })
    })

    app.put("/api/weather/:id", (req, res) => {
        db.WeatherWidget.findOneAndUpdate(
            { 
                userId: req.params.id 
            },  { 
                "$set": { 
                    "xCoord": req.body.xCoord, 
                    "yCoord": req.body.yCoord, 
                    "location": req.body.location 
                }}, { "new": true }, (err, response) => {
            if (err) {
                console.log(err)
            }
            else {
                res.send(response)
            }
        })
    })

    app.delete("/api/weather/:id", (req, res) => {
        db.WeatherWidget.deleteOne({ userId: req.params.id }, (err, response) => {
            if (err) {
                console.log(err)
            }
        })
    })
}