const express = require('express');
const db = require("../helpers/projectModel");

const router = express.Router();

router.get("/", (req,res) => {
    db.get(req.query)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                error: "The projects information could not be retrieved."
            });
        })
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    db.get(id)
        .then(project => {
            if (project) {
                res.status(200).json(db)
            } else {
                res.status(404).json({ errorMessage: 'Project does not exist' })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: 'Project could not be retrieved' })
        })
});


router.post("/", (req, res) => {
    const body = req.body;
    db.insert(body)
    .then(obj => {
        console.log("New Project", obj);
        res.status(201).json(obj);
    })
    .catch(error => {
        console.log(error)
        if (!error.name || !error.description) {
            res.status(400).json({ errorMessage: 'Please provide a name and description for the post.'})
        } else {
            res.status(500).json({ error: 'There was an error saving the post.'});
        }
    })
})

module.exports = router;

