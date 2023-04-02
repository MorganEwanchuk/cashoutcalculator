let addButton = document.getElementById('addButton')
let addName = document.getElementById('addName')

let names = {}
let count = 0
addButton.addEventListener('click', () => {
    
    if(addName.value != ""){
    names[count] = { name: addName.value}
    count++
}else{
    return
}
    console.log(names)
    addName.value = ""
})
