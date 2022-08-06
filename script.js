let addButton = document.getElementById('addButton')
let addName = document.getElementById('addName')
let bartenderNames = document.getElementById('bartenderNames')
let calculateButton = document.getElementById('calculate')
let names = []
let count = 0
let output = document.getElementById('output')
let size = 0
const tipField = document.getElementById('addTips')

const clearButton = document.getElementById('clear')
clearButton.addEventListener('click', clear)

addButton.addEventListener('touchstart', handleAddBartender, false)
addButton.addEventListener('click', handleAddBartender, false)

function handleAddBartender(event){
    console.log(event)
    if(event.type === 'touchstart' || event.type === 'click'){
        event.preventDefault()
        if(addName.value != ""){
            addNameToList(addName.value)
        }else{
            return
        }
    }
}
// Add name event listener 
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
let removeButton = document.getElementsByClassName('removeButton')
function addNameToList(nameValue){
    // Add key values to each name object
    nameValue = nameValue.toLowerCase()
    names[count] = {name: nameValue}
    names[count].hours = 0
    names[count].tips = 0
    names[count].food = 0
    // Gets length of main object
    size = Object.keys(names).length
    console.log(names)
    count++
    // Resets name input field
    addName.value = ""
    renderNameToList(nameValue)
}


function renderNameToList(nameValue){
    const nameContainer = document.createElement('div')
    nameContainer.setAttribute('id', `${nameValue}`)
    nameContainer.classList.add('nameContainer')
    nameContainer.classList.add(`${nameValue.toLowerCase()}`)

    const name = document.createElement('p')
    // Sets each rendered name with its name ID
    name.setAttribute('id', `${nameValue}`)
    name.classList.add('bartenderName')
    nameValue = String(nameValue)
    nameValue = nameValue.toLowerCase().split("")
    nameValue[0] = nameValue[0].toUpperCase()
    nameValue = nameValue.join("")
    console.log(nameValue)
    name.innerText = nameValue

    // Add remove button
    const removeButton = document.createElement('button')
    removeButton.innerHTML = "X"
    removeButton.setAttribute('id', `remove${nameValue.toLowerCase()}`)
    // removeButton.classList.add(`${nameValue.toLowerCase()}`)
    removeButton.classList.add('removeButton')
 
    removeButton.addEventListener('click', removeNameFromList)
    nameContainer.appendChild(removeButton)

    nameContainer.appendChild(name)
    bartenderNames.appendChild(nameContainer)
    // Function that attaches hours and food field to each name
    addHoursAndFoodToBartender(nameValue.toLowerCase(), nameContainer)
}

function addHoursAndFoodToBartender(nameValue, nameContainer){
   // Add hours field input
   const hoursInput = document.createElement('input')
   hoursInput.type = 'number'
   hoursInput.placeholder = `Enter hours for ${nameValue}`
   hoursInput.classList.add('hoursAmount')
   hoursInput.setAttribute('id', `${nameValue}Hours`)
   console.log(nameValue)
    // Add food field input
   const foodInput = document.createElement('input')
   foodInput.type = 'number'
   foodInput.placeholder = `Enter food for ${nameValue}`
   foodInput.setAttribute('id', `${nameValue}Food`)

   // Add remove button
//    const removeButton = document.createElement('button')
//    removeButton.innerHTML = "X"
//    removeButton.setAttribute('id', `remove${nameValue}`)
//    removeButton.classList.add(`${nameValue}`)
//    removeButton.classList.add('removeButton')

//    removeButton.addEventListener('click', removeNameFromList)

    // Attaches both inputs to entered name
    // nameContainer.appendChild(removeButton)
    nameContainer.appendChild(hoursInput) 
    nameContainer.appendChild(foodInput) 

}

calculateButton.addEventListener('click', handleCalculateTips)
// calculateButton.addEventListener('touchstart', handleCalculateTips)


function handleCalculateTips(){
    if(tipField.value == ""){
        alert('Please enter tip value')
        return
    }
    if(names.length == 0){
        alert('Please add at least 1 bartender')
        return
    }
    const totalTips = tipField.value
    
    for(let i = 0; i < size; i++){
        console.log(names)
        console.log(`${names[i].name}`)
        
        const bartenderHours = document.getElementById(`${names[i].name}Hours`)
        const bartenderFood = document.getElementById(`${names[i].name}Food`)
        names[i].hours = bartenderHours.value
        names[i].food = bartenderFood.value
        console.log(names)
    }

    if(!ensureFields()){
       return
    }
    clearOutput()
    let rate = hourlyRate(totalTips)
    let pushRateToDom = document.createElement('h3')
    pushRateToDom.innerHTML = `Rate: ${rate.toFixed(2)}`
    output.appendChild(pushRateToDom)
    console.log(rate)
    console.log(totalTips)
    console.log(size)
    console.table(names)
    divideFood(names)
    calculateTips(rate)
    pushResults(names)
    clearAllInputs()
}
function clearAllInputs(){
    for(let i = 0; i < names.length; i++){
        names[i].food = ""
        names[i].tips = 0
        console.log(names)
        let food = document.querySelector(`#${names[i].name}Food`)
        food.value = ""
    }
}
function ensureFields(){
    for(let i = 0; i < names.length; i++){
        if(names[i].hours == ""){
            console.log(names[i].hours)
            alert('Please fill out all hours')
            return false;
        }
    }return true;
}
function hourlyRate(tips){
    
    let hours = 0
    const totalHours = document.createElement('h3')
    for(let i = 0; i < size; i++){
        hours += Number(names[i].hours)
    }
    console.log(hours)
    totalHours.innerHTML = `Hours: ${hours}`
    output.appendChild(totalHours)
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
function clearOutput(){
    while(output.firstChild){

        output.removeChild(output.firstChild)
    }
}
function clear(){
    const elements = document.querySelectorAll('.nameContainer')
    console.log(elements)
    elements.forEach(element =>{
        element.remove()
    })
    while(output.firstChild){

        output.removeChild(output.firstChild)
    }
    names = [];
    count = 0;
    size = 0;
    tipField.value = ""
    console.log(names)


}
function removeNameFromList(e){
    let idName = e.target.id
    console.log(e.target)
    idName = idName.replace('remove', "")
    console.log(idName.toLowerCase())
    const element = document.getElementById(idName.toLowerCase())
    if(element){
        element.remove()
    }

    const className = e.target.classList[0];
    console.log(className)
    const namesArray = Object.values(names)

    const filteredArray = namesArray.filter(obj => obj.name !== className)

   
    size -= 1
    count -= 1
    names = names.filter(obj => obj.name !== idName)


}
function calculateTips(rate){
   
    for(let i = 0; i < size; i++){
        // names[i].tips += names[i].hours * rate.toFixed(2)
        names[i].tips = (Number(names[i].tips) + Number(names[i].hours * rate)).toFixed(2)
        console.log(names)
    }
}
function pushResults(names){
    const header = document.createElement('h2')
    header.innerHTML = "Tip amounts:"
    output.appendChild(header)

    for(let i = 0; i < size; i++){
        const bartenderTip = document.createElement('p')
        bartenderTip.innerHTML = `${names[i].name}: ${names[i].tips}`
        output.appendChild(bartenderTip)
    }
}
const tillNumbers = document.getElementsByClassName('tillNumber')
const addTill = document.getElementById('addTill')
addTill.addEventListener('click', calculateTill)
function calculateTill(){
    const coinAmount = document.getElementById('coinAmount').value
    const otherAmount = document.getElementById('otherAmount').value
    let otherAndCoinAmount = Number(coinAmount) + Number(otherAmount)
    const tillAmountsArray =[]
    for(let i = 0; i < tillNumbers.length; i++){
        console.log(tillNumbers[i].id)
    }
    for(let i = 0; i < tillNumbers.length; i++){
        let number = tillNumbers[i].id * tillNumbers[i].value
        tillAmountsArray.push(number)
    }

    let totalTillNumber = tillAmountsArray.reduce((a,b) => a + b) + otherAndCoinAmount
    console.log(totalTillNumber)
    console.log(otherAndCoinAmount)
    console.log(tillAmountsArray)

    let tillOutput = document.getElementById('tillOutput')
    let finalTillOutput = document.createElement('h2')
    finalTillOutput.innerHTML = `Total : ${totalTillNumber}`
    tillOutput.appendChild(finalTillOutput)
// addTill.addEventListener('')


}
