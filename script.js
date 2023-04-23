let addButton = document.getElementById('addButton')
let addName = document.getElementById('addName')
let bartenderNames = document.getElementById('bartenderNames')
let calculateButton = document.getElementById('calculate')
let names = {}
let count = 0
let output = document.getElementById('output')
let size = 0
addButton.addEventListener('click', () => {
    
    if(addName.value != ""){
    addNameToList(addName.value)
    count++
}else{
    return
}

})

addName.addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        event.preventDefault()
        if(addName.value != ""){
            addNameToList(addName.value)
        }else{
            return
        }
    }
})

function addNameToList(nameValue){
    names[count] = {name: nameValue}
    names[count].hours = 0
    names[count].tips = 0
    size = Object.keys(names).length
    console.log(names)
    count++
    addName.value = ""
    renderNameToList(nameValue)
}

function renderNameToList(nameValue){
    const name = document.createElement('p')
    name.setAttribute('id', `${nameValue}`)
    name.innerText = nameValue
    bartenderNames.appendChild(name)
    addHoursAndFoodToBartender(nameValue, name)
}

function addHoursAndFoodToBartender(nameValue, name){
   // Add hours field input
   const hoursInput = document.createElement('input')
   hoursInput.type = 'number'
    // Add food field input
   const foodInput = document.createElement('input')
   foodInput.type = 'number'

//    const hoursInputButton = document.createElement('button')

    hoursInput.placeholder = `Enter hours for ${nameValue}`
    hoursInput.setAttribute('id', `${nameValue}Hours`)

    foodInput.placeholder = `Enter food for ${nameValue}`
    foodInput.classList.add(`${nameValue}Food`)
//    hoursInputButton.classList.add(`${nameValue}Button`)
//    hoursInputButton.innerText = "Add Hours"
   name.appendChild(hoursInput) 
   name.appendChild(foodInput) 

//    name.appendChild(hoursInputButton)
}
calculateButton.addEventListener('click', () => {
    const totalTips = document.getElementById('addTips').value
    for(let i = 0; i < size; i++){
        console.log(names)
        const bartenderHours = document.getElementById(`${names[i].name}Hours`)
        names[i].hours = bartenderHours.value
        console.log(names)
    }
    let rate = hourlyRate(totalTips)
    console.log(rate)
    console.log(totalTips)
    console.log(size)
    calculateTips(rate)
    // for(let i = 0; i < size; i++){
    //     names[i].tips = totalTips / size
    //     console.log(names)
    // }
    pushResults(names)
})
function hourlyRate(tips){
    let hours = 0
    for(let i = 0; i < size; i++){
        hours += Number(names[i].hours)
    }
    console.log(hours)
    let rate = tips / hours
    return rate
}
function calculateTips(rate){
    for(let i = 0; i < size; i++){
        names[i].tips = names[i].hours * rate.toFixed(2).slice(0,-1)
        console.log(names)
    }
}
function pushResults(names){
    const header = document.createElement('h1')
    header.innerHTML = "Tip amounts:"
    output.appendChild(header)

    for(let i = 0; i < size; i++){
        const bartenderTip = document.createElement('p')
        bartenderTip.innerHTML = `${names[i].name}: ${names[i].tips}`
        output.appendChild(bartenderTip)
    }
}
