$("#btn").click(function () {
    document.getElementById("info").style.display = "none";
    let x = document.getElementById('link').value;
    if (x != "") {
        x = x.split('/d/')[1].split('/edit')[0];
        let url = 'https://gsx2json.com/api?id=' + x + '&amp;sheet=Sheet1&amp;columns=False';
    }

    console.log(url);
    $.getJSON(url, function (data) {

        data = data.rows;
        let TotalPointsArray = [];

        // Loop through the data array to sum the points
        for (let i = 0; i < data.length; i++) {
            let FullName = data[i].FullName;
            let Assignments = data[i].Assignments;
            let Points = data[i].Points;

            let found = false;
            for (let j = 0; j < TotalPointsArray.length; j++) {
                if (TotalPointsArray[j].FullName == FullName) {
                    found = true;
                    if (Assignments.includes("PT")) {
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
                    else if (Assignments.includes("TheoreticalQuiz")) {
                        TotalPointsArray[j].TheoreticalQuizPoints.push(Points);
                    }
                }
            }
            if (!found) {
                let newObject = {
                    FullName: FullName,
                    PTPointsArray: [],
                    MiniQuizPoints: 0,
                    MidtermQuizPoints: 0,
                    EndtermQuizPoints: 0,
                    MidtermPoints: 0,
                    EndtermPoints: 0,
                    TheoreticalQuizPoints: 0
                };
                if (Assignments.includes("PT")) {
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
                else if (Assignments.includes("TheoreticalQuiz")) {
                    newObject.TheoreticalQuizPoints = Points;
                }
                TotalPointsArray.push(newObject);
            }
        }

        // Sort and calculate points for PT
        for (let i = 0; i < TotalPointsArray.length; i++) {
            let PTPointsArray = TotalPointsArray[i].PTPointsArray;
            PTPointsArray.sort(function (a, b) { return a - b });
            let PTPoints = 0;
            for (let j = 2; j < PTPointsArray.length; j++) {
                PTPoints += PTPointsArray[j];
            }
            TotalPointsArray[i].PTPoints = PTPoints;
        }

        // Function to calculate the final grade
        function getGradeFinal(object) {
            let PTPoints = object.PTPoints;
            let MiniQuizPoints = object.MiniQuizPoints;
            let MidtermQuizPoints = object.MidtermQuizPoints;
            let EndtermQuizPoints = object.EndtermQuizPoints;
            let MidtermPoints = object.MidtermPoints;
            let EndtermPoints = object.EndtermPoints;
            let TheoreticalQuizPoints = object.TheoreticalQuizPoints;

            // Check if any grade condition is failed
            if (PTPoints < 400 || MiniQuizPoints < 20 || TheoreticalQuizPoints < 20 || MidtermPoints < 50 || EndtermPoints < 50) {
                return "FAILED";
            } else {
                // Calculate X based on the new criteria (no HWPoints)
                let X = ((MidtermQuizPoints + EndtermQuizPoints) / 100) * 10 + ((MidtermPoints) / 100) * 40 + ((EndtermPoints) / 100) * 40;

                // Assign grades based on X value
                if (X > 85) {
                    return 5;
                } else if (X >= 70) {
                    return 4;
                } else if (X >= 60) {
                    return 3;
                } else if (X >= 50) {
                    return 2;
                } else {
                    return "FAILED";
                }
            }
        }

        // Loop through the TotalPointsArray to assign grades
        for (let i = 0; i < TotalPointsArray.length; i++) {
            TotalPointsArray[i].Grade = getGradeFinal(TotalPointsArray[i]);

            let table = document.getElementById("table");
            let row = table.insertRow(-1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            cell1.innerHTML = TotalPointsArray[i].FullName;
            cell2.innerHTML = TotalPointsArray[i].Grade;
        }

    });
});

function calculateGrade() {
    // let FullName = document.getElementById("FullName").value;
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
    let TheoreticalQuizPoints = document.getElementById("TheoreticalQuizPoints").value;
    // for (let i = 0; i < HWPointsArray.length; i++) {
    //     HWPointsSum += parseInt(HWPointsArray[i]);
    // }
    // for (let i = 0; i < PTPointsArray.length; i++) {
    //     PTPointsSum += parseInt(PTPointsArray[i]);
    // }
    let object = {
        // FullName: FullName,
        HWPoints: parseInt(HWPoints),
        PTPoints: parseInt(PTPoints),
        MidtermPoints: parseInt(MidtermPoints),
        EndtermPoints: parseInt(EndtermPoints),
        MiniQuizPoints: parseInt(MiniQuizPoints),
        MidtermQuizPoints: parseInt(MidtermQuizPoints),
        EndtermQuizPoints: parseInt(EndtermQuizPoints),
        TheoreticalQuizPoints: parseInt(TheoreticalQuizPoints)
    }
    // console.log(object);
    let grade = getGradeFinal(object);
    document.getElementById("grade").innerHTML = grade;
}
document.getElementById("getGrade").addEventListener("click", calculateGrade);
document.getElementById("manual").addEventListener("click", function () {
    document.getElementById("information").classList.remove("py-5");
    document.getElementById("information").classList.remove("mt-4");
    document.getElementById("information").classList.add("mt-0");
    document.getElementById("information").classList.add("py-3");
    document.getElementById("selection").style.display = "none";
    document.getElementById("AutoData").style.display = "none";
    document.getElementById("ManualData").style.display = "block";
});
document.getElementById("auto").addEventListener("click", function () {
    document.getElementById("information").classList.remove("py-5");
    document.getElementById("information").classList.remove("mt-4");
    document.getElementById("information").classList.add("mt-0");
    document.getElementById("information").classList.add("py-3");
    document.getElementById("selection").style.display = "none";
    document.getElementById("ManualData").style.display = "none";
    document.getElementById("AutoData").style.display = "block";
});
// display element with id info when user clicks element with id help
document.getElementById("help").addEventListener("click", function () {
    document.getElementById("info").style.display = "block";
});
//on clicking FpGrader , refresh the page
document.getElementById("FPGrader").addEventListener("click", function () {
    // return to index.html
    window.location.href = "index.html";
});

