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


module.exports = router;

