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
    res.sendfile(path.join(__dirname, 'friends.json'));
})

app.get('/survey', (req, res) => {
    res.sendfile(path.join(__dirname, 'app/public/survey.html'))
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
        })
    })
})

app.listen(PORT, () => {
    console.log('App listening on PORT' + PORT);
})
