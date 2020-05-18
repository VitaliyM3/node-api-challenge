const express = require('express');
const db = require("../helpers/actionModel");
const projectdb = require("../helpers/projectModel");

const router = express.Router();


router.get("/project/:id", (req, res) => {
    const id = req.params.id;
    projectdb.getProjectActions(id)
    .then(actions => {
        if (actions) {
            res.status(200).json(actions)
        } else {
            res.status(404).json({ errorMessage: "Actions for this project do not exsist" });
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "Actions could not be retrieved" });
    })
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    db.get(id)
    .then(actions => {
        if (actions) {
            res.status(200).json(actions)
        } else {
            res.status(404).json({ errorMessage: "Actions do not exsist" });
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "Actions could not be retrieved" });
    })
});

router.post("/", (req, res) => {
    const body = req.body;
    db.insert(body)
    .then(obj => {
        console.log('New Action ', obj);
        res.status(201).json(obj);
    })
    .catch(error => {
        if(!error.project_id || !error.description || !error.notes) {
            res.status(400).json({ errorMessage: 'Please provide a project_id of an existing project, a description, and notes for the post.'});
        } else {
            console.log('There was an error while saving the post to the server.');
            res.status(500).json({ error: 'There was an error while saving the post.'});
        };
    });
});

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const body = req.body;
    db.update(id, body)
    .then(updated => {
        if (updated) {
            if (body.project_id && body.description && body.notes) {
                res.status(200).json(body);
            } else {
                res.status(400).json({ errorMessage: 'Please provide a project_id of an existing project, a description, and notes for the update.'});
            }
        } else {
            res.status(404).json({message: 'Action does not exist'});
        }
    })
    .catch(error => {
        console.log(error);
        res.status(404).json({ message: 'Action does not exist' })
    })
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    db.remove(id)
    .then(deleted => {
        if (deleted) {
            res.status(200).json(deleted);
        } else {
            res.status(404).json({ errorMessage: 'The action with the specified ID does not exist.'});
        };
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: 'The action could not be removed.' });
    })
});


module.exports = router;