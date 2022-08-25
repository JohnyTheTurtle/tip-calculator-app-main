let selectedButton = 0;
const tips = document.querySelectorAll(".tip")
const resetbtn = document.querySelector(".reset")
const inputs = document.querySelectorAll("input")
const customtip = document.querySelector(".tips input")
const tipresult = document.querySelector(".tipresult")
const totalresult = document.querySelector(".totalresult")

tips.forEach((a, b) => a.addEventListener("click", () => { //set only one tip button
    if(selectedButton === 0){
        selectedButton = tips[b]
        stylebutton(selectedButton)
        customtip.value = "" ///if button tip clicked, clear customtip
        unstyleinput(customtip)
        
    } else if(selectedButton === tips[b]) {
        unstylebutton(selectedButton)
        selectedButton = 0
    } else {
        unstylebutton(selectedButton)
        selectedButton = tips[b]
        stylebutton(selectedButton)
        
    }
    calctipandtotal()
}))
customtip.addEventListener("input", () => { //if custom tip field is used, do not use button value
    if (selectedButton !== 0){
    unstylebutton(selectedButton)
    selectedButton = 0   
    }
})
resetbtn.addEventListener("click", () => { //actions on reset button click
    inputs.forEach(a=> unstyleinput(a))
    tipresult.innerText = "0.00"
    totalresult.innerText = "0.00"
    if (selectedButton !== 0){
        unstylebutton(selectedButton)
        selectedButton = 0   
    }
    for (input of inputs){
        input.value = ""
    }
})
////styling functions
function stylebutton(button) {
    button.style.color = "var(--Very-dark-cyan)"
    button.style.backgroundColor = "var(--Strong-cyan)"
}
function unstylebutton(button) {
    button.style.color = null
    button.style.backgroundColor = null
}
function wronginputstyle(input) {
    input.style.boxShadow = "0 0 3px 2px red"
    input.classList.toggle("shake");
    tipresult.innerText = "0.00"
    totalresult.innerText = "0.00"
}
function unstyleinput(input) {
    input.style.boxShadow = null
}
function inputstyle(input) {
    input.style.boxShadow = "0 0 3px 2px var(--Strong-cyan)"
}
////input field validations
inputs.forEach((a, b) => a.addEventListener("input", () => {
    if (inputs[b].value === "" || Number(inputs[b].value) < 0){
        wronginputstyle(inputs[b])
    } else {
        unstyleinput(inputs[b])
        inputstyle(inputs[b])
        calctipandtotal()
    }
}))

////calculate tipamount and total
function calctipandtotal(){
    let tippercent = 0
    if (selectedButton === 0){
        tippercent = Number(customtip.value) ///custom tip
    } else if (selectedButton !== 0){
        tippercent = Number(selectedButton.innerHTML.split("%")[0]) ///button tip
    }
    let bill = Number(inputs[0].value)
    let numofpeople = Number(inputs[2].value)
    if (bill >= 0 && numofpeople >= 0 && tippercent >= 0) {
        let tipamountperperson = 0.00
        let totalperperson = 0.00
        if (numofpeople > 0) {
            tipamountperperson =  bill * tippercent/100 /numofpeople
            totalperperson = bill/numofpeople + tipamountperperson
        }
        tipresult.innerText = (Math.ceil(tipamountperperson*100)/100).toFixed(2)
        totalresult.innerText = (Math.ceil(totalperperson*100)/100).toFixed(2)
    }
}