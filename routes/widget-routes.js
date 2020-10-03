const db = require("../models");

module.exports = app => {

    // Creating a new note widget in the database
    app.post("/api/todolist", (req, res) => {
        db.TodoWidget.create({
            userId: req.body.userId,
            notes: [],
            xCoord: req.body.xCoord,
            yCoord: req.body.yCoord
        })
        .catch (err => {
            res.status(401).json(err)
        })
    });

    // When the user logs on, this will return all the todo widgets from the database, which will get sorted
    // on the front end to check if the user has added this widget or not.
    app.get("/api/todolist/", (req, res) => {
        db.TodoWidget.find({}, (err, response) => {
            if (err) {
                console.log(err)
            }
            res.json(response);
        })
    })

    // When the user moves the todolist, update the X and Y coordinates
    app.put("/api/todolist/:id", (req, res) => {
        db.TodoWidget.findOneAndUpdate({ userId: req.params.id },  { "$set": { "xCoord": req.body.xCoord, "yCoord": req.body.yCoord }}, { "new": true }, (err, response) => {
            if (err) {
                console.log(err)
            }
            else {
                res.send(response)
            }
        })
    })

    // If the user removes the widget from their dashboard, we need to remove it from the database too. ########################################################
    app.delete("/api/todolist/:id", (req, res) => {
        db.TodoWidget.deleteOne({ userId: req.params.id }, (err, response) => {
            if (err) {
                console.log(err)
            }
        })
    })

    // Add a new note that will be filtered later 
    app.post("/api/notes", (req, res) => {
        db.TodoNotes.create({
            userId: req.body.userId,
            note: req.body.note,
            notePriority: req.body.priority,
            completed: req.body.completed
        })
    })

    app.get("/api/notes/:id", (req, res) => {
        db.TodoNotes.find({ userId: req.params.id }, (err, response) => {
            if (err) {
                console.log(err)
            }
            res.json(response)
        })
    })

    // delete a note
    app.delete("/api/notes/:id", (req, res) => {
        db.TodoNotes.deleteOne({ _id: req.params.id }, (err, response) => {
            if (err) {
                console.log(err)
            }
        })
    })

    // delete all notes associated to the user
    app.delete("/api/allNotes/:id", (req, res) => {
        db.TodoNotes.deleteMany({ userId: req.params.id }, (err, response) => {
            if (err) {
                console.log(err)
            }
        })
    })
}

