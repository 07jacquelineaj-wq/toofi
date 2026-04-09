function getDailyPIN(type){

let today = new Date()

let day = today.getDate()
let month = today.getMonth() + 1

let base = (day * month * 7) % 10000

if(type === "morning"){
return (base + 123).toString().padStart(4,"0")
}

if(type === "night"){
return (base + 789).toString().padStart(4,"0")
}

}

function brush(time){

let correctPIN = getDailyPIN(time)

let inputPIN = prompt("Enter Parent PIN")

if(inputPIN !== correctPIN){
alert("Wrong PIN")
return
}

let today = new Date().toDateString()

let data = JSON.parse(localStorage.getItem("toofiData")) || {
streak:0,
lastDate:"",
morning:false,
night:false,
completedToday:false
}

if(data.lastDate){

let last = new Date(data.lastDate)
let yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1)

if(last.toDateString() !== yesterday.toDateString() && last.toDateString() !== today){
data.streak = 0
}

}

if(data.lastDate !== today){
data.morning = false
data.night = false
data.completedToday = false
data.lastDate = today
}

if(time === "morning" && data.morning){
alert("Morning already brushed")
return
}

if(time === "night" && data.night){
alert("Night already brushed")
return
}

if(time === "morning") data.morning = true
if(time === "night") data.night = true

if(data.morning && data.night && !data.completedToday){
data.streak += 1
data.completedToday = true
alert("Great job! Full day completed!")
}

localStorage.setItem("toofiData", JSON.stringify(data))

updateUI()

}

function updateUI(){

let data = JSON.parse(localStorage.getItem("toofiData"))

if(!data){
data = {
streak:0,
morning:false,
night:false,
completedToday:false
}
}

let streakText = document.getElementById("streak")
if(streakText){
streakText.innerText = data.streak
}

let parentStreak = document.getElementById("parentStreak")
if(parentStreak){
parentStreak.innerText = data.streak
}

let todayBrush = document.getElementById("todayBrush")
if(todayBrush){
todayBrush.innerText =
"Morning: " + (data.morning ? "Completed" : "Pending") +
" | Night: " + (data.night ? "Completed" : "Pending")
}

let pinText = document.getElementById("todayPIN")
if(pinText){
pinText.innerText =
"Morning PIN: " + getDailyPIN("morning") +
" | Night PIN: " + getDailyPIN("night")
}

}

function checkParentPassword(){

let savedPassword = localStorage.getItem("parentPassword")

if(!savedPassword){

let create = prompt("Create Parent Password")
localStorage.setItem("parentPassword", create)

alert("Password Created!")
location.reload()
return
}

let input = prompt("Enter Parent Password")

if(input !== savedPassword){
alert("Wrong Password")
window.location.href = "index.html"
}

}

function changePassword(){

let current = localStorage.getItem("parentPassword")

let input = prompt("Enter Current Password")

if(input !== current){
alert("Wrong Password")
return
}

let newPass = prompt("Enter New Password")

localStorage.setItem("parentPassword", newPass)

alert("Password Changed Successfully")

}

function resetData(){
localStorage.removeItem("toofiData")
alert("Reset Success")
location.reload()
}

if(window.location.pathname.includes("parent.html")){
checkParentPassword()
}

window.onload = updateUI