const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
let PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: "application/vnd.api+json"
}));

app.use(express.static(path.join(__dirname, 'app/public')))


app.get('/apiFriendList', (req, res) => {
    res.sendFile(path.join(__dirname, 'friends.json'));
})

app.get('/survey', (req, res) => {
    res.sendFile(path.join(__dirname, 'app/public/survey.html'))
})

app.post('/newperson', (req, res) => {
    let newPerson = req.body;
    // let friendsArray = [];
    res.status(200).send(true)

    fs.readFile(path.join(__dirname, 'friends.json'), (err, data) => {
        if (err) throw err;

        let friendArray = JSON.parse(data);

        friendArray.push(newPerson);

        fs.writeFile(path.join(__dirname, 'friends.json'), JSON.stringify(friendArray, null, 2), 'utf-8', (err) => {
            if (err) throw err;
            console.log("file updated!");

            analyzeFriendList (path.join(__dirname, 'friends.json'));
        })
    })
})

function analyzeFriendList(loc) {
    fs.readFile(loc, (err, data) => {
        if (err) throw err;

        let friendsList = JSON.parse(data);
        let arrayLength = friendsList.length
        let currLowScore = 100;
        let match = {};

        for (let i = 0; i < arrayLength - 1; i++) {
            let totalDifference = arrayDifference(friendsList[i].scores, friendsList[arrayLength - 1].scores);
            if (totalDifference < currLowScore){
                currLowScore = totalDifference;
                match = {
                    name: friendsList[i].name,
                    photo: friendsList[i].photo
                }
            }
        }
        return match;
    })
}

function arrayDifference(array1, array2) {
    let resultArray = [];
    let totalDifference = 0;

    for (let i = 0; i < 5; i++) {
        resultArray.push(Math.abs(array1[i] - array2[i]))
    }

    totalDifference = resultArray.reduce(function(a, b) {
        return a + b
    });

    // console.log(array1, array2, resultArray);
    // console.log(totalDifference);

    return totalDifference;
}

app.listen(PORT, () => {
    console.log('App listening on PORT' + PORT);
})
