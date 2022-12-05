


let url = 'https://gsx2json.com/api?id=1hFnrv9y1ZTce0tDlWuXTJ9wwrwvFB_rw54-9z4lA8xI&sheet=Sheet1&columns=False';




$("#btn").click(function () {
    // document.getElementById("info").style.display = "none";
    // let x = document.getElementById('link').value.split('/d/')[1].split('/edit')[0];
    // url = 'https://gsx2json.com/api?id=' + x + '&sheet=Sheet1&columns=False';
    document.getElementById("info").style.display = "none";
    let x = document.getElementById('link').value;
    if (x != "") {
        url = 'https://gsx2json.com/api?id=' + x + '&sheet=Sheet1&columns=False';
    }

    console.log(url);
    $.getJSON(url, function (data) {


        // Find all the rows with same FullName and sum the points of HW1,HW2 and so on in a variable HWPointsArray, every object
        // in the array will have the FullName and the sum of the points for that student
        data = data.rows;
        let TotalPointsArray = [];
        // let newObject = {};

        //Data contains an array of objects, each object is a row in the spreadsheet
        // evry object has a property called FullName, we will use this to find all the rows with the same FullName
        // every object has a Assigment property, which is HW1 , HW2 ... HW10 or PT1, Pt2 ... PT10
        // we need to sum all the PT and HW points for each student and put them in an array of objects
        // each object will have fullName , HWsum and PTsum 
        //implement your code here

        // loop through the data array
        // for each object in the array, check if the FullName is already in the TotalPointsArray
        // if it is not, add a new object to the TotalPointsArray with the FullName and the points for that Assignments
        // if it is, find the object in the TotalPointsArray with the same FullName , then check if the Assignments is HW or PT and add the points to the correct property

        for (let i = 0; i < data.length; i++) {
            let FullName = data[i].FullName;
            let Assignments = data[i].Assignments;
            let Points = data[i].Points;

            let found = false;
            for (let j = 0; j < TotalPointsArray.length; j++) {
                if (TotalPointsArray[j].FullName == FullName) {
                    found = true;
                    if (Assignments.includes("HW")) {

                        TotalPointsArray[j].HWPointsArray.push(Points);
                    } else if (Assignments.includes("PT")) {
                        TotalPointsArray[j].PTPointsArray.push(Points);
                    } else if (Assignments.includes("MiniQuiz")) {
                        TotalPointsArray[j].MiniQuizPoints.push(Points);
                    } else if (Assignments.includes("MidtermQuiz")) {
                        TotalPointsArray[j].MidtermQuizPoints.push(Points);
                    } else if (Assignments.includes("EndtermQuiz")) {
                        TotalPointsArray[j].EndtermQuizPoints.push(Points);
                    } else if (Assignments.includes("MidtermPoints")) {
                        TotalPointsArray[j].MidtermPoints.push(Points);
                    } else if (Assignments.includes("EndtermPoints")) {
                        TotalPointsArray[j].EndtermPoints.push(Points);
                    }
                }
            }
            if (!found) {
                let newObject = {
                    FullName: FullName,
                    HWPointsArray: [],
                    PTPointsArray: [],
                    MiniQuizPoints: 0,
                    MidtermQuizPoints: 0,
                    EndtermQuizPoints: 0,
                    MidtermPoints: 0,
                    EndtermPoints: 0

                }
                if (Assignments.includes("HW")) {
                    newObject.HWPointsArray.push(Points);
                } else if (Assignments.includes("PT")) {
                    newObject.PTPointsArray.push(Points);
                } else if (Assignments.includes("MiniQuiz")) {
                    newObject.MiniQuizPoints = Points;
                } else if (Assignments.includes("MidtermQuiz")) {
                    newObject.MidtermQuizPoints = Points;
                } else if (Assignments.includes("EndtermQuiz")) {
                    newObject.EndtermQuizPoints = Points;
                } else if (Assignments.includes("MidtermPoints")) {
                    newObject.MidtermPoints = Points;
                } else if (Assignments.includes("EndtermPoints")) {
                    newObject.EndtermPoints = Points;
                }
                TotalPointsArray.push(newObject);
            }


        }

        console.log(TotalPointsArray);

        // loop through the TotalPointsArray , sort the HWPointsArray and PTPointsArray in ascescending order and sum all but the first 2 values in each array, put the sum in a new property called HWPoints and PTPoints
        // implement your code here

        for (let i = 0; i < TotalPointsArray.length; i++) {
            let HWPointsArray = TotalPointsArray[i].HWPointsArray;
            let PTPointsArray = TotalPointsArray[i].PTPointsArray;
            HWPointsArray.sort(function (a, b) {
                return a - b
            });
            PTPointsArray.sort(function (a, b) {
                return a - b
            });
            let HWPoints = 0;
            let PTPoints = 0;
            for (let j = 2; j < HWPointsArray.length; j++) {
                HWPoints += HWPointsArray[j];
            }
            for (let j = 2; j < PTPointsArray.length; j++) {
                PTPoints += PTPointsArray[j];
            }
            TotalPointsArray[i].HWPoints = HWPoints;
            TotalPointsArray[i].PTPoints = PTPoints;
        }


        console.log(TotalPointsArray);

        //make a function that takes an object of the TotalPointsArray and returns a grade based on the following criteria
        // if the PTPoints are less than 400, the grade is 1 . otherwise if the HWPoints is between 0-300 grade 2 , 301 - 500 grade 3
        // 500-700 grade 4 and 700 and above grade 5

        function getGrade(object) {
            if (object.PTPoints < 400) {
                return 1;
            } else if (object.HWPoints >= 0 && object.HWPoints <= 300) {
                return 2;
            } else if (object.HWPoints >= 301 && object.HWPoints <= 500) {
                return 3;
            } else if (object.HWPoints >= 501 && object.HWPoints <= 700) {
                return 4;
            } else if (object.HWPoints >= 701) {
                return 5;
            }
        }



        // loop through the TotalPointsArray and add a new property called Grade and assign it the value returned by the getGrade function

        for (let i = 0; i < TotalPointsArray.length; i++) {
            TotalPointsArray[i].Grade = getGradeFinal(TotalPointsArray[i]);

            let table = document.getElementById("table");
            let row = table.insertRow(-1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            cell1.innerHTML = TotalPointsArray[i].FullName;
            cell2.innerHTML = TotalPointsArray[i].Grade;

        }

        // 










    });
});

function getGradeFinal(object) {

    let HWPoints = object.HWPoints;
    let PTPoints = object.PTPoints;
    let MiniQuizPoints = object.MiniQuizPoints;
    let MidtermQuizPoints = object.MidtermQuizPoints;
    let EndtermQuizPoints = object.EndtermQuizPoints;
    let MidtermPoints = object.MidtermPoints;
    let EndtermPoints = object.EndtermPoints;

    if (HWPoints < 400 || PTPoints < 400 || MiniQuizPoints < 40 || (MidtermQuizPoints + EndtermQuizPoints) < 25 || MidtermPoints < 50 || EndtermPoints < 50) {
        return "FAILED";
    } else {

        let X = (((HWPoints / 800) * 100) * 0.15) + ((MidtermQuizPoints + EndtermQuizPoints) * 0.15) + (MidtermPoints * 0.35) + (EndtermPoints * 0.35);
        if (X > 85) {
            return 5;
        } else if (X >= 70) {
            return 4;
        } else if (X >= 60) {
            return 3;
        } else if (X >= 50) {
            return 2;
        } else if (X < 50) {
            return "FAILED";
        }
    }
}

function calculateGrade() {
    let FullName = document.getElementById("FullName").value;
    let HWPoints = document.getElementById("HWPoints").value;
    let PTPoints = document.getElementById("PTPoints").value;
    // let HWPointsArray = HWPoints.split(",");
    // let PTPointsArray = PTPoints.split(",");
    // let HWPointsSum = 0;
    // let PTPointsSum = 0;
    let MiniQuizPoints = document.getElementById("MiniQuizPoints").value;
    let MidtermQuizPoints = document.getElementById("MidtermQuizPoints").value;
    let EndtermQuizPoints = document.getElementById("EndtermQuizPoints").value;
    let MidtermPoints = document.getElementById("MidtermPoints").value;
    let EndtermPoints = document.getElementById("EndtermPoints").value;


    // for (let i = 0; i < HWPointsArray.length; i++) {
    //     HWPointsSum += parseInt(HWPointsArray[i]);
    // }
    // for (let i = 0; i < PTPointsArray.length; i++) {
    //     PTPointsSum += parseInt(PTPointsArray[i]);
    // }
    let object = {
        FullName: FullName,
        HWPoints: HWPoints,
        PTPoints: PTPoints,
        MidtermPoints: MidtermPoints,
        EndtermPoints: EndtermPoints,
        MiniQuizPoints: MiniQuizPoints,
        MidtermQuizPoints: MidtermQuizPoints,
        EndtermQuizPoints: EndtermQuizPoints


    }
    let grade = getGradeFinal(object);
    document.getElementById("grade").innerHTML = grade;
}




document.getElementById("getGrade").addEventListener("click", calculateGrade);

document.getElementById("manual").addEventListener("click", function () {
    document.getElementById("selection").style.display = "none";
    document.getElementById("AutoData").style.display = "none";
    document.getElementById("ManualData").style.display = "block";

});

document.getElementById("auto").addEventListener("click", function () {
    document.getElementById("selection").style.display = "none";
    document.getElementById("ManualData").style.display = "none";
    document.getElementById("AutoData").style.display = "block";
});

// display element with id info when user clicks element with id help
document.getElementById("help").addEventListener("click", function () {
    document.getElementById("info").style.display = "block";
});










