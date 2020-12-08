const field = document.getElementById("game-field")
const headerBtns = document.getElementById("header-btns")
const pointCounter = document.getElementById("point-counter")



headerBtns.addEventListener('click', ev=>{
    if (ev.target.classList.contains("start")) {
       let addBlock = CreateBlock()
       pointCounter.value = 0
       refresh()
       clearTimeout(refresh())
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

    let sec=0;
    let min=01;

function refresh()
{
	sec--;
	if(sec==-01){sec=59; min=min-1;}
	else{min=min;}
	if(sec<=9){sec="0" + sec;}
	time=(min<=9 ? "0"+min : min) + ":" + sec;
    if(document.getElementById('timer')){timer.value=time;}
    setTimeout("refresh()", 1000)
	// действие, если таймер 00:00
	if(min=='00' && sec=='00'){
		alert("finish")
	}
}

