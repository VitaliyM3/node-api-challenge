const express = require('express');
const db = require("../helpers/projectModel");

const router = express.Router();


router.get("/", (req, res) => {
    db.get()
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
                res.status(200).json(project)
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
            res.status(400).json({ errorMessage: 'Please provide a name and description for the project.'})
        } else {
            res.status(500).json({ error: 'There was an error saving the project.'});
        }
    })
})

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const project = req.body;
    if (!project.name || !project.description) {
        res.status(400).json({ errorMessage: "Please provide the name and description for the project" });
    } else {
        db.update(id, project)
        .then(updated => {
            if (updated) {
                res.status(200).json(updated);
            } else {
                res.status(404).json({ message: "The project with the specified ID does not exist" });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "The project information could not be modified"});
        })
    }
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    db.remove(id)
    .then(project => {
        if (project) {
            res.status(200).json({ message: "This project was deleted"})
        } else {
            res.status(404).json({ message: "The project with the specified ID does not exist" })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "The project could not be deleted" })
    })
});

module.exports = router;

