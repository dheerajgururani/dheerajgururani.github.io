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
    localStorage.setItem('timex', JSON.stringify(timex))
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




function load(x) {
    let load = JSON.parse(localStorage.getItem('save'))
    let maptypeLocal = JSON.parse(localStorage.getItem('maptype'))
    setName(JSON.parse(localStorage.getItem('namez')))
    document.getElementById("timeDisplay").innerHTML = Time(JSON.parse(localStorage.getItem('timex')))

    if (x == 0) {
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

}