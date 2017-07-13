const fs = require('fs');
let test1 = [1, 2, 3, 4, 5];
let test2 = [2, 3, 4, 5, 2];


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

analyzeFriendList('./friends.json');