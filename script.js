let addButton = document.getElementById('addButton')
let addName = document.getElementById('addName')
let bartenderNames = document.getElementById('bartenderNames')

let names = {}
let count = 0

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
    names[count].hours = 3
    console.log(names)
    count++
    addName.value = ""
    renderNameToList(nameValue)
}

function renderNameToList(nameValue){
    const name = document.createElement('p')
    name.classList.add(`${nameValue}`)
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
    hoursInput.classList.add(`${nameValue}Hours`)

    foodInput.placeholder = `Enter food for ${nameValue}`
    foodInput.classList.add(`${nameValue}Food`)
//    hoursInputButton.classList.add(`${nameValue}Button`)
//    hoursInputButton.innerText = "Add Hours"
   name.appendChild(hoursInput) 
   name.appendChild(foodInput) 

//    name.appendChild(hoursInputButton)
}


