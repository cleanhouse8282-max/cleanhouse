
let selectedDate="";
let selectedTime="오전";

async function load(){

const res = await fetch("/api/reservations");
const data = await res.json();

const cal = document.getElementById("calendar");

for(let i=1;i<=30;i++){

const div=document.createElement("div");
div.className="day white";

const date="2026-02-"+i;

const found=data.find(r=>r.date===date && r.status==="confirmed");

if(found){
div.className="day gray";
div.innerHTML=i+" 예약완료";
}else{
div.innerHTML=i+" 예약가능";
div.onclick=()=>{
selectedDate=date;
document.getElementById("form").style.display="block";
};
}

cal.appendChild(div);

}

}

async function reserve(){

await fetch("/api/reserve",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
date:selectedDate,
time:selectedTime,
name:name.value,
phone:phone.value,
address:address.value,
memo:memo.value
})
});

alert("예약 완료");
location.reload();

}

load();
