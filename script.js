let addButton = document.getElementById('addButton')
let addName = document.getElementById('addName')

let names = []

addButton.addEventListener('click', () => {
    names.push(addName.value)
    console.log(names)
    addName.value = ""
})
