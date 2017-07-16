const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')

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


app.get('/apiFriendList', function (req,res){
	res.sendfile(path.join(__dirname,'friends.json'));
})

app.get('/survey', function (req, res){
	res.sendfile(path.join(__dirname, 'app/public/survey.html'))
})

app.listen(PORT, function(){
	console.log('App listening on PORT' + PORT);
})