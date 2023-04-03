let addButton = document.getElementById('addButton')
let addName = document.getElementById('addName')
let bartenderNames = document.getElementById('bartenderNames')

let names = {}
let count = 0

addButton.addEventListener('click', () => {
    
    if(addName.value != ""){
    names[count] = { name: addName.value}
    addNameToList(addName.value)
    count++
}else{
    return
}
    console.log(names)
    addName.value = ""
})

function addNameToList(name){
    name = document.createElement('p')
    name.innerText = addName.value
    bartenderNames.appendChild(name)
    
}