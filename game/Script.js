
let start = 0
let end = 0
let timex = 0

function delegate(parent, child, when, what) {
    function eventHandlerFunction(event) {
        let eventTarget = event.target
        let eventHandler = this
        let closestChild = eventTarget.closest(child)

        if (eventHandler.contains(closestChild)) {
            what(event, closestChild)
        }
    }

    parent.addEventListener(when, eventHandlerFunction)
}

const table = document.querySelector('table')
let namez = ''


//let n = prompt("Enter the number to print the table of n");

let n = 0

function addWall(x, y) {
    table.querySelectorAll('tr')[x].querySelectorAll('td')[y].classList.add('wall')
}

function addNumberedWall(x, y, n) {
    table.querySelectorAll('tr')[x].querySelectorAll('td')[y].classList.add('numberedWall')
    table.querySelectorAll('tr')[x].querySelectorAll('td')[y].innerHTML = n

    // add n to the dataset of the element
    table.querySelectorAll('tr')[x].querySelectorAll('td')[y].dataset.number = n

}

function map1() {
    n = 7
    createTable(n)
    // add wall class to the element at index 1,4
    addNumberedWall(0, 3, 1)
    addNumberedWall(1, 1, 0)
    addNumberedWall(1, 5, 2)
    addWall(3, 0)
    addWall(3, 3)
    addWall(3, 6)
    addWall(5, 1)
    addNumberedWall(5, 5, 2)
    addNumberedWall(6, 3, 3)

}

function map2() {
    n = 7
    createTable(n)
    addNumberedWall(0, 2, 0)
    addWall(0, 4)
    addWall(2, 0)
    addWall(2, 2)
    addNumberedWall(2, 4, 3)
    addWall(2, 6)
    addNumberedWall(3, 3, 1)
    addNumberedWall(4, 0, 2)
    addWall(4, 2)
    addWall(4, 4)
    addWall(4, 6)
    addWall(6, 2)
    addNumberedWall(6, 4, 2)
}

function map3() {
    n = 10
    createTable(n)
    addWall(0, 1)
    addNumberedWall(1, 5, 3)
    addNumberedWall(1, 7, 2)
    addWall(1, 9)
    addNumberedWall(2, 1, 0)
    addWall(2, 2)
    addWall(2, 7)
    addWall(3, 4)
    addNumberedWall(4, 1, 1)
    addWall(4, 4)
    addNumberedWall(4, 5, 1)
    addWall(4, 6)
    addWall(5, 3)
    addWall(5, 4)
    addWall(5, 5)
    addNumberedWall(5, 8, 3)
    addWall(6, 5)
    addNumberedWall(7, 2, 1)
    addNumberedWall(7, 7, 0)
    addWall(7, 8)
    addNumberedWall(8, 0, 3)
    addWall(8, 2)
    addNumberedWall(8, 4, 0)
    addNumberedWall(9, 8, 0)
}

//map1()
// map2()
// map3()

//on clicking element with id map1, call map1 function, map2 for map2 and so on , but remove the existing table first


// delegate(document, 'elem', 'click', function (event, element) {
//     if (element.id == "start") {
//         alert("start")
//     }
// })



function createTable(n) {
    for (let i = 0; i < n; i++) {
        const newTR = document.createElement('tr')
        for (let j = 0; j < n; j++) {
            const newTD = document.createElement('td')
            newTD.dataset.rowIndex = i
            newTD.dataset.colIndex = j
            // 2. step: fillwith data is empty now
            newTR.appendChild(newTD)
        }
        table.appendChild(newTR)
    }

}







async function colourUp(r, c) {
    for (let i = r; i >= 0; i--) {
        if (table.querySelectorAll('tr')[i].querySelectorAll('td')[c].classList.contains('wall') || table.querySelectorAll('tr')[i].querySelectorAll('td')[c].classList.contains('numberedWall')) {
            break
        }
        table.querySelectorAll('tr')[i].querySelectorAll('td')[c].classList.add('coloured')
        await new Promise(r => setTimeout(r, 100));
    }

}

async function colourDown(r, c) {
    for (let i = r; i < n; i++) {
        if (table.querySelectorAll('tr')[i].querySelectorAll('td')[c].classList.contains('wall') || table.querySelectorAll('tr')[i].querySelectorAll('td')[c].classList.contains('numberedWall')) {
            break
        }
        table.querySelectorAll('tr')[i].querySelectorAll('td')[c].classList.add('coloured')
        await new Promise(r => setTimeout(r, 100));
    }

}

async function colourLeft(r, c) {
    for (let i = c; i >= 0; i--) {
        if (table.querySelectorAll('tr')[r].querySelectorAll('td')[i].classList.contains('wall') || table.querySelectorAll('tr')[r].querySelectorAll('td')[i].classList.contains('numberedWall')) {
            break
        }
        table.querySelectorAll('tr')[r].querySelectorAll('td')[i].classList.add('coloured')
        await new Promise(r => setTimeout(r, 100));
    }

}

async function colourRight(r, c) {
    for (let i = c; i < n; i++) {
        if (table.querySelectorAll('tr')[r].querySelectorAll('td')[i].classList.contains('wall') || table.querySelectorAll('tr')[r].querySelectorAll('td')[i].classList.contains('numberedWall')) {
            break
        }
        table.querySelectorAll('tr')[r].querySelectorAll('td')[i].classList.add('coloured')
        await new Promise(r => setTimeout(r, 100));
    }

}

function elementPosition(r, c) {
    // depending on the row and column index of the element return if the element is upperleftcorner, upperrightcorner, lowerleftcorner, lowerrightcorner, leftside, rightside, upperside, lowerside, middle
    if (r == 0 && c == 0) {
        return 'upperleftcorner'
    }
    else if (r == 0 && c == n - 1) {
        return 'upperrightcorner'
    }
    else if (r == n - 1 && c == 0) {
        return 'lowerleftcorner'
    }
    else if (r == n - 1 && c == n - 1) {
        return 'lowerrightcorner'
    }
    else if (r == 0 && c != 0 && c != n - 1) {
        return 'upperside'
    }
    else if (r == n - 1 && c != 0 && c != n - 1) {
        return 'lowerside'
    }
    else if (c == 0 && r != 0 && r != n - 1) {
        return 'leftside'
    }
    else if (c == n - 1 && r != 0 && r != n - 1) {
        return 'rightside'
    }
    else {
        return 'middle'
    }


}

//make a function that goes through the table and finds the element with the class numberedWall and then checks if the number
// in the dataset of the element is equal to the number of elements around it that have the class bulb 
// make sure to avoid the left, right, up, down elements that have row index or column index out of bounds

function checkNumberedWall() {
    let bulbCount = 0
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (table.querySelectorAll('tr')[i].querySelectorAll('td')[j].classList.contains('numberedWall')) {
                let number = table.querySelectorAll('tr')[i].querySelectorAll('td')[j].dataset.number
                let position = elementPosition(i, j)
                if (position == 'upperleftcorner') {
                    if (table.querySelectorAll('tr')[i].querySelectorAll('td')[j + 1].classList.contains('bulb')) {
                        bulbCount++
                    }
                    if (table.querySelectorAll('tr')[i + 1].querySelectorAll('td')[j].classList.contains('bulb')) {
                        bulbCount++
                    }
                }
                else if (position == 'upperrightcorner') {
                    if (table.querySelectorAll('tr')[i].querySelectorAll('td')[j - 1].classList.contains('bulb')) {
                        bulbCount++
                    }
                    if (table.querySelectorAll('tr')[i + 1].querySelectorAll('td')[j].classList.contains('bulb')) {
                        bulbCount++
                    }
                }
                else if (position == 'lowerleftcorner') {
                    if (table.querySelectorAll('tr')[i].querySelectorAll('td')[j + 1].classList.contains('bulb')) {
                        bulbCount++
                    }
                    if (table.querySelectorAll('tr')[i - 1].querySelectorAll('td')[j].classList.contains('bulb')) {
                        bulbCount++
                    }
                }
                else if (position == 'lowerrightcorner') {
                    if (table.querySelectorAll('tr')[i].querySelectorAll('td')[j - 1].classList.contains('bulb')) {
                        bulbCount++
                    }
                    if (table.querySelectorAll('tr')[i - 1].querySelectorAll('td')[j].classList.contains('bulb')) {
                        bulbCount++
                    }
                }
                else if (position == 'upperside') {
                    if (table.querySelectorAll('tr')[i].querySelectorAll('td')[j - 1].classList.contains('bulb')) {
                        bulbCount++
                    }
                    if (table.querySelectorAll('tr')[i].querySelectorAll('td')[j + 1].classList.contains('bulb')) {
                        bulbCount++
                    }
                    if (table.querySelectorAll('tr')[i + 1].querySelectorAll('td')[j].classList.contains('bulb')) {
                        bulbCount++
                    }
                }
                else if (position == 'lowerside') {
                    if (table.querySelectorAll('tr')[i].querySelectorAll('td')[j - 1].classList.contains('bulb')) {
                        bulbCount++
                    }
                    if (table.querySelectorAll('tr')[i].querySelectorAll('td')[j + 1].classList.contains('bulb')) {
                        bulbCount++
                    }
                    if (table.querySelectorAll('tr')[i - 1].querySelectorAll('td')[j].classList.contains('bulb')) {
                        bulbCount++
                    }
                }
                else if (position == 'leftside') {
                    if (table.querySelectorAll('tr')[i - 1].querySelectorAll('td')[j].classList.contains('bulb')) {
                        bulbCount++
                    }
                    if (table.querySelectorAll('tr')[i + 1].querySelectorAll('td')[j].classList.contains('bulb')) {
                        bulbCount++
                    }
                    if (table.querySelectorAll('tr')[i].querySelectorAll('td')[j + 1].classList.contains('bulb')) {
                        bulbCount++
                    }
                }
                else if (position == 'rightside') {
                    if (table.querySelectorAll('tr')[i - 1].querySelectorAll('td')[j].classList.contains('bulb')) {
                        bulbCount++
                    }
                    if (table.querySelectorAll('tr')[i + 1].querySelectorAll('td')[j].classList.contains('bulb')) {
                        bulbCount++
                    }
                    if (table.querySelectorAll('tr')[i].querySelectorAll('td')[j - 1].classList.contains('bulb')) {
                        bulbCount++
                    }
                }
                else if (position == 'middle') {
                    if (table.querySelectorAll('tr')[i - 1].querySelectorAll('td')[j].classList.contains('bulb')) {
                        bulbCount++
                    }
                    if (table.querySelectorAll('tr')[i + 1].querySelectorAll('td')[j].classList.contains('bulb')) {
                        bulbCount++
                    }
                    if (table.querySelectorAll('tr')[i].querySelectorAll('td')[j - 1].classList.contains('bulb')) {
                        bulbCount++
                    }
                    if (table.querySelectorAll('tr')[i].querySelectorAll('td')[j + 1].classList.contains('bulb')) {
                        bulbCount++
                    }
                }
                if (bulbCount == number) {
                    table.querySelectorAll('tr')[i].querySelectorAll('td')[j].classList.add('greenBorder')
                }
                else if ((bulbCount != number) && (table.querySelectorAll('tr')[i].querySelectorAll('td')[j].classList.contains('greenBorder'))) {
                    table.querySelectorAll('tr')[i].querySelectorAll('td')[j].classList.remove('greenBorder')
                }
                bulbCount = 0
            }
        }
    }
}




// function {
//     table.querySelectorAll('td').forEach(element => {
//         if (element.classList.contains('numberedWall')) {
//             let r = element.dataset.rowIndex
//             let c = element.dataset.colIndex
//             let count = 0

//             // check if the element is upperleftcorner, upperrightcorner, lowerleftcorner, lowerrightcorner, leftside, rightside, upperside, lowerside, middle
//             // depending on the position of the element, check the number of bulbs around it
//             // if its upperleftcorner, check the number of bulbs in the right and down direction but not in the left and up direction

//             let position = elementPosition(r, c)
//             if (position == 'upperleftcorner') {
//                 if (table.querySelectorAll('tr')[r].querySelectorAll('td')[c + 1].classList.contains('bulb')) {
//                     count++
//                 }
//                 if (table.querySelectorAll('tr')[r + 1].querySelectorAll('td')[c].classList.contains('bulb')) {
//                     count++
//                 }
//             }
//             else if (position == 'upperrightcorner') {
//                 if (table.querySelectorAll('tr')[r].querySelectorAll('td')[c - 1].classList.contains('bulb')) {
//                     count++
//                 }
//                 if (table.querySelectorAll('tr')[r + 1].querySelectorAll('td')[c].classList.contains('bulb')) {
//                     count++
//                 }
//             }
//             else if (position == 'lowerleftcorner') {
//                 if (table.querySelectorAll('tr')[r].querySelectorAll('td')[c + 1].classList.contains('bulb')) {
//                     count++
//                 }
//                 if (table.querySelectorAll('tr')[r - 1].querySelectorAll('td')[c].classList.contains('bulb')) {
//                     count++
//                 }
//             }
//             else if (position == 'lowerrightcorner') {
//                 if (table.querySelectorAll('tr')[r].querySelectorAll('td')[c - 1].classList.contains('bulb')) {
//                     count++
//                 }
//                 if (table.querySelectorAll('tr')[r - 1].querySelectorAll('td')[c].classList.contains('bulb')) {
//                     count++
//                 }
//             }
//             else if (position == 'leftside') {
//                 if (table.querySelectorAll('tr')[r].querySelectorAll('td')[c + 1].classList.contains('bulb')) {
//                     count++
//                 }
//                 if (table.querySelectorAll('tr')[r + 1].querySelectorAll('td')[c].classList.contains('bulb')) {
//                     count++
//                 }
//                 if (table.querySelectorAll('tr')[r - 1].querySelectorAll('td')[c].classList.contains('bulb')) {
//                     count++
//                 }
//             }
//             else if (position == 'rightside') {
//                 if (table.querySelectorAll('tr')[r].querySelectorAll('td')[c - 1].classList.contains('bulb')) {
//                     count++
//                 }
//                 if (table.querySelectorAll('tr')[r + 1].querySelectorAll('td')[c].classList.contains('bulb')) {
//                     count++
//                 }
//                 if (table.querySelectorAll('tr')[r - 1].querySelectorAll('td')[c].classList.contains('bulb')) {
//                     count++
//                 }
//             }
//             else if (position == 'upperside') {
//                 if (table.querySelectorAll('tr')[r].querySelectorAll('td')[c + 1].classList.contains('bulb')) {
//                     count++
//                 }
//                 if (table.querySelectorAll('tr')[r].querySelectorAll('td')[c - 1].classList.contains('bulb')) {
//                     count++
//                 }
//                 if (table.querySelectorAll('tr')[r + 1].querySelectorAll('td')[c].classList.contains('bulb')) {
//                     count++
//                 }
//             }
//             else if (position == 'lowerside') {
//                 if (table.querySelectorAll('tr')[r].querySelectorAll('td')[c + 1].classList.contains('bulb')) {
//                     count++
//                 }
//                 if (table.querySelectorAll('tr')[r].querySelectorAll('td')[c - 1].classList.contains('bulb')) {
//                     count++
//                 }
//                 if (table.querySelectorAll('tr')[r - 1].querySelectorAll('td')[c].classList.contains('bulb')) {
//                     count++
//                 }
//             }
//             else if (position == 'middle') {
//                 if (table.querySelectorAll('tr')[r].querySelectorAll('td')[c + 1].classList.contains('bulb')) {
//                     count++
//                 }
//                 if (table.querySelectorAll('tr')[r].querySelectorAll('td')[c - 1].classList.contains('bulb')) {
//                     count++
//                 }
//                 if (table.querySelectorAll('tr')[r + 1].querySelectorAll('td')[c].classList.contains('bulb')) {
//                     count++
//                 }
//                 if (table.querySelectorAll('tr')[r - 1].querySelectorAll('td')[c].classList.contains('bulb')) {
//                     count++
//                 }
//             }
//             if (count === element.dataset.number) {
//                 element.classList.remove('numberedWall')
//                 element.classList.add('greenBorder')
//             }
//             else {
//                 return
//             }

//         }
//     })

// }

function saveGame() {

    let saveGame = []
    table.querySelectorAll('td').forEach((td) => {
        if (td.classList.contains('wrong')) {
            saveGame.push('wrong')
        }
        else if (td.classList.contains('bulb')) {
            saveGame.push('bulb')
            //saveGame.push('coloured')
        }
        else if (td.classList.contains('coloured')) {
            saveGame.push('coloured')
        }
        else if (td.classList.contains('greenBorder')) {
            saveGame.push('greenBorder')
        }
        else {
            saveGame.push('none')
        }
    })
    localStorage.setItem('saveGame', JSON.stringify(saveGame))
    localStorage.setItem('maptypee', JSON.stringify(maptype))
    localStorage.setItem('timee', timex)
    localStorage.setItem('nameze', JSON.stringify(namez))


}




function doColouring(event, element) {
    if (element.classList.contains('wrong')) {
        element.classList.remove('wrong')
        element.classList.remove('bulb')
        element.classList.add('coloured')

    }

    else if (element.classList.contains('bulb')) {
        element.classList.remove('bulb')



        table.querySelectorAll('td').forEach((td) => {
            if (td.dataset.rowIndex === element.dataset.rowIndex || td.dataset.colIndex === element.dataset.colIndex) {
                td.classList.remove('coloured')
            }
        })

    }

    else if (element.classList.contains('coloured')) {
        element.classList.remove('coloured')
        element.classList.add('wrong')
        element.classList.add('bulb')

    }

    else if (element.classList.contains('numberedWall') || element.classList.contains('wall')) {

        return
    }

    else {
        element.classList.add('bulb')
        element.classList.add('coloured')

        // make all the elements of that row and column of that element coloured , when you reach a wall stop
        // 1. step: get the row and column index of the element
        // create a loop that colours the elements up to the wall
        // create a loop that colours the elements down to the wall
        // create a loop that colours the elements left to the wall
        // create a loop that colours the elements right to the wall

        let r = element.dataset.rowIndex
        let c = element.dataset.colIndex
        table.querySelectorAll('td')

        // for (let i = r; i >= 0; i--) {
        //     if (table.querySelectorAll('tr')[i].querySelectorAll('td')[c].classList.contains('wall')) {
        //         break
        //     }
        //     else {
        //         table.querySelectorAll('tr')[i].querySelectorAll('td')[c].classList.add('coloured')
        //     }
        // }

        colourUp(r, c)
        colourDown(r, c)
        colourLeft(r, c)
        colourRight(r, c)

    }

    // the blocks with class numberedWall should get the class greenBorder 
    // if the blocks around it have as many bulbs as the number on the numberedWall


}

//let beautifiedTime

function Time(e) {
    let hr = 00
    let min = 00
    let sec = 00
    if (e > 3600) {
        hr = Math.floor(e / 3600)
        min = Math.floor((e % 3600) / 60)
        sec = Math.floor((e % 3600) % 60)
    }
    else if (e > 60) {
        min = Math.floor(e / 60)
        sec = Math.floor(e % 60)
    }
    else {
        sec = Math.floor(e)
    }


    //print hr min sec as hr : min : sec
    if (hr < 10) {
        hr = '0' + hr
    }
    if (min < 10) {
        min = '0' + min
    }
    if (sec < 10) {
        sec = '0' + sec
    }


    let beautifiedTime = hr + ':' + min + ':' + sec
    return beautifiedTime
    // document.getElementById("timeDisplay").innerHTML = beautifiedTime
}


// let start = 0
// let end = 0
// let timex = 0



function keepChecking() {
    //keep running the function checkNumberedwall until all the elements
    // except the ones with class wall or numberedWall have the class coloured
    // and the ones with class numberedWall have the class greenBorder
    end = Date.now();
    timex = (Math.floor(end - start) / 1000)
    document.getElementById("timeDisplay").innerHTML = Time(timex)
    saveGame()
    let allColoured = true
    let allGreen = true
    table.querySelectorAll('td').forEach((td) => {
        if (td.classList.contains('numberedWall')) {
            if (!td.classList.contains('greenBorder')) {
                allGreen = false
            }
        }
        else if (!td.classList.contains('coloured') && !td.classList.contains('wall')) {
            allColoured = false
        }
    }
    )
    if (allColoured && allGreen) {
        // display a message that the user has won
        PreviousGames()
        alert('You have won')
        reset()
        return
    }
    else if (allColoured && !allGreen) {
        alert('You have lost')
        return
    }
    else {
        checkNumberedWall()
        setTimeout(keepChecking, 1)
    }




}


let maptype = 0



function reset() {
    table.querySelectorAll('td').forEach((td) => {
        td.classList.remove('bulb')
        td.classList.remove('coloured')
        td.classList.remove('wrong')
        td.classList.remove('greenBorder')
    })
    // table.querySelectorAll('td').forEach((td) => {
    //     if (td.classList.contains('numberedWall')) {
    //         td.classList.add('numberedWall')
    //     }
    // })
    keepChecking()
}

function save() {
    let save = []
    table.querySelectorAll('td').forEach((td) => {
        if (td.classList.contains('wrong')) {
            save.push('wrong')
        }
        else if (td.classList.contains('bulb')) {
            save.push('bulb')
            //save.push('coloured')
        }
        else if (td.classList.contains('coloured')) {
            save.push('coloured')
        }
        else if (td.classList.contains('greenBorder')) {
            save.push('greenBorder')
        }
        else {
            save.push('none')
        }
    })
    localStorage.setItem('save', JSON.stringify(save))
    localStorage.setItem('maptype', JSON.stringify(maptype))
    localStorage.setItem('time', JSON.stringify(timex))
    localStorage.setItem('namez', JSON.stringify(namez))
}

// function load() {
//     let save = JSON.parse(localStorage.getItem('save'))
//     let maptype = JSON.parse(localStorage.getItem('maptype'))
//     let timex = JSON.parse(localStorage.getItem('timex'))
//     let namez = JSON.parse(localStorage.getItem('namez'))
//     document.getElementById("timeDisplay").innerHTML = Time(timex)
//     setName(namez)
//     if (maptype == 1) {
//         map1()
//     }
//     else if (maptype == 2) {
//         map2()
//     }
//     else if (maptype == 3) {
//         map3()
//     }

//     let i = 0
//     table.querySelectorAll('td').forEach((td) => {
//         if (save[i] == 'bulb') {
//             td.classList.add('bulb')
//             td.classList.add('coloured')
//         }
//         else if (save[i] == 'coloured') {
//             td.classList.add('coloured')
//         }
//         else if (save[i] == 'wrong') {
//             td.classList.add('wrong')
//         }
//         else if (save[i] == 'greenBorder') {
//             td.classList.add('greenBorder')
//         }
//         i++
//     })
//     keepChecking()
// }

//implement save and load functions


function loadGame() {
    let load = JSON.parse(localStorage.getItem('saveGame'))
    let maptype = JSON.parse(localStorage.getItem('maptypee'))
    let timex = JSON.parse(localStorage.getItem('timee'))
    let namez = JSON.parse(localStorage.getItem('nameze'))
    document.getElementById("timeDisplay").innerHTML = Time(timex)
    setName(namez)
    if (maptype == 1) {
        map1()
    }
    else if (maptype == 2) {
        map2()
    }
    else if (maptype == 3) {
        map3()
    }

    let i = 0
    table.querySelectorAll('td').forEach((td) => {
        if (load[i] == 'bulb') {
            td.classList.add('bulb')
            td.classList.add('coloured')
        }
        else if (load[i] == 'coloured') {
            td.classList.add('coloured')
        }
        else if (load[i] == 'wrong') {
            td.classList.add('wrong')
        }
        else if (load[i] == 'greenBorder') {
            td.classList.add('greenBorder')
        }
        i++
    })
    keepChecking()
}







function load(x) {
    reset()

    let load = JSON.parse(localStorage.getItem('save'))

    let maptypeLocal = JSON.parse(localStorage.getItem('maptype'))
    setName(JSON.parse(localStorage.getItem('namez')))
    timex = JSON.parse(localStorage.getItem('time'))

    if (x == 0) {
        load = JSON.parse(localStorage.getItem('saveGame'))
        maptypeLocal = JSON.parse(localStorage.getItem('maptypee'))
        setName(JSON.parse(localStorage.getItem('nameze')))
        timex = JSON.parse(localStorage.getItem('timee'))

        if (maptypeLocal == 1) {
            map1()
            maptype = 1
        }
        else if (maptypeLocal == 2) {
            map2()
            maptype = 2
        }
        else if (maptypeLocal == 3) {
            map3()
            maptype = 3
        }
    }

    //call save function if page is closed or refreshed 

    table.querySelectorAll('td').forEach((td, index) => {
        if (load[index] === 'bulb') {
            td.classList.add('bulb')
            td.classList.add('coloured')
        }
        else if (load[index] === 'coloured') {
            td.classList.add('coloured')
        }
        else if (load[index] === 'wrong') {
            td.classList.add('wrong')
            td.classList.add('bulb')
            td.classList.add('coloured')
        }
        else if (load[index] === 'greenBorder') {
            td.classList.add('greenBorder')
        }
        else {
            return
        }
    })

    keepChecking()

}


//implement the reset save and load and undo buttons

resetButton.addEventListener('click', reset)
saveButton.addEventListener('click', save)
loadButton.addEventListener('click', load)

// IMPLEMENT THE UNDO BUTTON THAT calls function reset and then calls function load

undoButton.addEventListener('click', () => {
    reset()
    load()
})


// hide the buttons initially



function hideButtons() {
    resetButton.style.display = 'none'
    saveButton.style.display = 'none'
    loadButton.style.display = 'none'
    undoButton.style.display = 'none'
}

hideButtons()


function showButtons() {
    resetButton.style.display = 'inline-block'
    saveButton.style.display = 'inline-block'
    loadButton.style.display = 'inline-block'
    undoButton.style.display = 'inline-block'
}

document.getElementById('floatGame').style.display = 'none'



delegate(document, '#map1', 'click', function (event, element1) {
    element1.classList.add('orangeBorder')
    delegate(document, '#start', 'click', function (event, element) {
        table.innerHTML = ""
        maptype = 1
        map1()
        element1.classList.remove('orangeBorder')
        start = Date.now();
        keepChecking()

        //hide div with id mapSelector and show div floatGame

        document.getElementById('mapSelector').style.display = 'none'
        document.getElementById('floatGame').style.display = 'block'








        showButtons()

    })


})


// function to store playerName , maptype and time elapsed for the 5 last games

function PreviousGames() {
    let playerName = document.getElementById('playerName').value
    let time = Time(timex)
    let map = maptype
    let previousGames = JSON.parse(localStorage.getItem('previousGames')) || []
    previousGames.push({ playerName, time, map })
    localStorage.setItem('previousGames', JSON.stringify(previousGames))
    console.log(previousGames)
}

// function to display the 5 last games
// function to display the 5 last games

function displayPreviousGames() {
    let previousGames = JSON.parse(localStorage.getItem('previousGames')) || []
    let previousGamesDiv = document.getElementById('previousGames')
    previousGamesDiv.innerHTML = ''

    // only display the 5 last games
    // if (previousGames.length > 5) {
    //     previousGames = previousGames.slice(previousGames.length - 5)
    // }

    //show in the  previousGames the 5 last games
    previousGames.forEach((game) => {
        let div = document.createElement('div')
        div.innerHTML = `Player: ${game.playerName} - Time: ${game.time} - Map: ${game.map}`
        previousGamesDiv.appendChild(div)
    })



}








delegate(document, '#map2', 'click', function (event, element1) {
    element1.classList.add('orangeBorder')
    delegate(document, '#start', 'click', function (event, element) {
        table.innerHTML = ""
        map2()
        maptype = 2
        element1.classList.remove('orangeBorder')
        start = Date.now();

        keepChecking()

        showButtons()

        document.getElementById('mapSelector').style.display = 'none'
        document.getElementById('floatGame').style.display = 'block'


    })

})

delegate(document, '#map3', 'click', function (event, element1) {
    element1.classList.add('orangeBorder')
    delegate(document, '#start', 'click', function (event, element) {
        table.innerHTML = ""
        map3()
        maptype = 3
        element1.classList.remove('orangeBorder')
        start = Date.now();
        // PreviousGames()
        keepChecking()
        showButtons()

        document.getElementById('mapSelector').style.display = 'none'
        document.getElementById('floatGame').style.display = 'block'
    })

})

//show the latest playerName map and Time elapsed in the leaderboard

// let playerName = localStorage.getItem('playerName')
// let map = localStorage.getItem('map')
// let time = localStorage.getItem('time')
// playerNameDisplay.innerHTML = playerName
// mapDisplay.innerHTML = map
// timeDisplay.innerHTML = time

//load saved game if there is one when user clicks on the loadGame button

loadGameButton.addEventListener('click', () => {
    // table.innerHTML = ""
    loadGame()
    mapSelector.style.display = 'none'
    floatGame.style.display = 'block'
    // Time(0)
    keepChecking()
    showButtons()
})



// show the input from element with id playerName in the element with id playerNameDisplay
playerName.addEventListener('input', () => {
    setName(playerName.value)
})


function setName(namex) {
    namez = namex
    playerNameDisplay.innerHTML = namez
}
// playerNameDisplay.innerHTML = playerName.value
// 

// var startTime, endTime;

// function start() {
//     startTime = performance.now();
// };

// function end() {
//     endTime = performance.now();
//     var timeDiff = endTime - startTime; //in ms 
//     // strip the ms 
//     timeDiff /= 1000;

//     // get seconds 
//     var seconds = Math.round(timeDiff);
//     console.log(seconds + " seconds");
// }

// // show the time elapsed in the element with id timeDisplay

// startButton.addEventListener('click', () => {
//     start()
//     startButton.style.display = 'none'
//     endButton.style.display = 'inline-block'
// })


// ON Clicking CustomMap element , take n value from input and create a n*n table
// take r,c values from input and make the corresponding cell wall
// take r,c,n values from input and make the corresponding cell numberedWall

//hid element CustomMapMaker initially

CustomMapMaker.style.display = 'none'







function CustomMap(event, element) {
    mapSelector.style.display = 'none'
    CustomMapMaker.style.display = 'block'


    // create and show Table when the createMap button is clicked

    createMap.addEventListener('click', () => {
        // table.innerHTML = ""
        n = document.getElementById('mapSize').value
        table.innerHTML = ""
        createTable(n)
        // GameChildMiddle.style.display = 'block'
        floatGame.style.display = 'block'


    })

    // show the 

    //implement restartGame button


    // insert wall and show it in the table, clear the input when insertWall button is clicked
    // insert numberedWall and show it in the table, clear the input when insertNumberedWall button is clicked

    insertWall.addEventListener('click', () => {
        let wallrow = document.getElementById('wallrow').value
        let wallcol = document.getElementById('wallcol').value
        addWall(wallrow, wallcol)
        document.getElementById('wallrow').value = ""
        document.getElementById('wallcol').value = ""
    })

    insertNumberedWall.addEventListener('click', () => {
        let numberedWallrow = document.getElementById('numberedWallrow').value
        let numberedWallcol = document.getElementById('numberedWallcol').value
        let numberedWallnumber = document.getElementById('numberedWallnumber').value
        addNumberedWall(numberedWallrow, numberedWallcol, numberedWallnumber)
        document.getElementById('numberedWallrow').value = ""
        document.getElementById('numberedWallcol').value = ""
        document.getElementById('numberedWallnumber').value = ""
    })





    // saveMap.addEventListener('click', () => {
    //     CustomMapMaker.style.display = 'none'
    //     keepChecking()
    //     showButtons()
    //     saveCustomMaps()
    // })
    StartGame.addEventListener('click', () => {
        CustomMapMaker.style.display = 'none'
        floatGame.style.display = 'block'
        keepChecking()
        showButtons()
        start = Date.now();
        // PreviousGames()

    })

    // colorDown and colorLeft functions are not working properly


}

restartGame.addEventListener('click', () => {
    reset()
    floatGame.style.display = 'none'
    mapSelector.style.display = 'block'
    timex = 0
})






// delegate(document, '#custom', 'click', CustomMap)








delegate(table, 'td', 'click', doColouring)
// displayPreviousGames()
delegate(document, '#custom', 'click', CustomMap)
displayPreviousGames()


