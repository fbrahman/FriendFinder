const express = require('express');
const path = require('path');

let router = express.Router();

router.use(express.static(path.join(__dirname, '../public')))

router.get('/', (req,res)=>{
	res.sendFile(path.join(__dirname, '../public/home.html'))
})

router.get('/survey', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/survey.html'))
})

module.exports = router;