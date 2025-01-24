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
