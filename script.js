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
    names[count].food = 0
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
   
   hoursInput.placeholder = `Enter hours for ${nameValue}`
   hoursInput.setAttribute('id', `${nameValue}Hours`)
    // Add food field input
   const foodInput = document.createElement('input')
   foodInput.type = 'number'
   foodInput.placeholder = `Enter food for ${nameValue}`
   foodInput.setAttribute('id', `${nameValue}Food`)

    // Attaches both inputs to entered name
   name.appendChild(hoursInput) 
   name.appendChild(foodInput) 

}
calculateButton.addEventListener('click', () => {
    const totalTips = document.getElementById('addTips').value
    for(let i = 0; i < size; i++){
        console.log(names)
        const bartenderHours = document.getElementById(`${names[i].name}Hours`)
        const bartenderFood = document.getElementById(`${names[i].name}Food`)
        names[i].hours = bartenderHours.value
        names[i].food = bartenderFood.value
        console.log(names)
    }
    let rate = hourlyRate(totalTips)
    console.log(rate)
    console.log(totalTips)
    console.log(size)
    divideFood(names)
    calculateTips(rate)
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
function divideFood(names){
    for(let i = 0; i < size; i++){
        const currentName = names[i].name
        const divideFood = names[i].food / (size - 1)
        console.log(currentName)
        console.log(divideFood)
        
        for(let i = 0; i < size; i++){
            
                if(names[i].name == currentName){
                    console.log(names[i])
                    names[i].tips -= names[i].food
                    distributeFood(names[i], divideFood)
                }
            
        }
    }
}
function distributeFood(name, food){
    for(let i = 0; i < size; i++){
        if(names[i] !== name){
            names[i].tips += food
        }
    }
}
function calculateTips(rate){
    for(let i = 0; i < size; i++){
        names[i].tips += names[i].hours * rate.toFixed(2).slice(0,-1)
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



// per hr 22.4

// 7 morgan = 156.8 food 11.55 // 145.25
// 6 amber = 134.4   // 137.28
// 4 jake= 89.6    // 92.48
// 3 evan= 67.2  // 70.08
// 5 skylar= 112 // 114.88