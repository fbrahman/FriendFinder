const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const friendsListAnalyzer = require('../data/friends.js');

let router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.text());
router.use(bodyParser.json({ type: "application/vnd.api+json" }));

router.get('/apiFriendList', (req, res) => {
    res.sendFile(path.join(__dirname, '../../friends.json'));

})

router.post('/newperson', function(req, res) {
    let newPerson = req.body;

    fs.readFile(path.join(__dirname, '../../friends.json'), function(err, data) {
        if (err) throw err;

        let friendArray = JSON.parse(data);

        friendArray.push(newPerson);

        fs.writeFile(path.join(__dirname, '../../friends.json'), JSON.stringify(friendArray, null, 2), 'utf-8', (err) => {
            if (err) throw err;

            console.log("file updated!");
        })

        let match = friendsListAnalyzer(friendArray);
        res.status(200).send(match);
    })
})

module.exports = router;