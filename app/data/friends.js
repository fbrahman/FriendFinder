let analyzeFriendList = function(array) {
    let match = {};
    let friendsList = array;
    let arrayLength = friendsList.length
    let currLowScore = 100;

    for (let i = 0; i < arrayLength - 1; i++) {
        let totalDifference = _arrayDifference(friendsList[i].scores, friendsList[arrayLength - 1].scores);
        if (totalDifference < currLowScore) {
            currLowScore = totalDifference;
            match = {
                name: friendsList[i].name,
                photo: friendsList[i].photo
            }
        }
    }
    return (match);
}

let _arrayDifference = function(array1, array2) {
    let resultArray = [];
    let totalDifference = 0;

    for (let i = 0; i < 5; i++) {
        resultArray.push(Math.abs(array1[i] - array2[i]))
    }

    totalDifference = resultArray.reduce(function(a, b) {
        return a + b
    });

    return totalDifference;
}

module.exports = analyzeFriendList;