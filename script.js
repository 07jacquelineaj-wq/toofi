let streak = 0;

let morningDone = false;
let nightDone = false;

function brushMorning(){

if(morningDone){
alert("Morning brushing already done!");
return;
}

morningDone = true;

alert("Morning brushing done! ☀️");

checkComplete();

}

function brushNight(){

if(nightDone){
alert("Night brushing already done!");
return;
}

nightDone = true;

alert("Night brushing done! 🌙");

checkComplete();

}

function checkComplete(){

if(morningDone && nightDone){

streak++;

document.getElementById("streak").innerText = streak + " days";

alert("Great job! Full brushing completed today 🦷✨");

}function startScan(){

const scanner = new Html5Qrcode("reader");

scanner.start(
{ facingMode: "environment" },
{
fps: 10,
qrbox: 250
},

(qrCodeMessage) => {

if(qrCodeMessage === "TOOFI_PARENT"){

alert("Brushing Verified! 🦷");

streak++;

document.getElementById("streak").innerText = streak + " days";

scanner.stop();

}

else{

alert("Invalid QR Code");

}

}

);

}

}