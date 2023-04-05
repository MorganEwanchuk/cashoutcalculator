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
console.log(names)
addName.value = ""
})

addName.addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        event.preventDefault()
        addNameToList(addName.value)
    }
})

function addNameToList(nameValue){
    names[count] = {name: nameValue}
    count++
    addName.value = ""
    renderNameToList(nameValue)
}

function renderNameToList(nameValue){
    const name = document.createElement('p')
    name.classList.add(`${nameValue}`)
    name.innerText = nameValue
    bartenderNames.appendChild(name)
}
