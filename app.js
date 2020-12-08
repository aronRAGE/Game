const field = document.getElementById("game-field")
const headerBtns = document.getElementById("header-btns")
const pointCounter = document.getElementById("point-counter")



headerBtns.addEventListener('click', ev=>{
    if (ev.target.classList.contains("start")) {
       let addBlock = CreateBlock()
       field.insertAdjacentHTML('beforeEnd', addBlock)
    }
})
field.addEventListener('click', event=>{
    if (event.target.classList.contains('btn-block')) {
        event.target.classList.add('d-none')
        pointCounter.value++
        
    }
})
function CreateBlock() {
    let Gameblock = `<button class="btn-block" name="block"></button>`
    //let Gameblocks = Gameblock + Gameblock
    return Gameblock
}