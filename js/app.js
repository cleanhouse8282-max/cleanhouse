
const intro=document.getElementById('intro');
function start(){intro.style.display='none';}

function getData(){return JSON.parse(localStorage.getItem('reserveData')||'[]');}
function setData(d){localStorage.setItem('reserveData',JSON.stringify(d));}
function getHoliday(){return JSON.parse(localStorage.getItem('holiday')||'[]');}
function getBase(){return parseInt(localStorage.getItem('basePrice')||'0');}

const date=document.getElementById('date');
const timeWrap=document.getElementById('timeWrap');
const formWrap=document.getElementById('formWrap');
const totalSpan=document.getElementById('total');

date.addEventListener('change',()=>{
  if(getHoliday().includes(date.value)){
    alert('휴일은 예약 불가');
    date.value='';
    return;
  }
  timeWrap.classList.remove('hidden');
});

document.getElementById('time').addEventListener('change',()=>{
  const exist=getData().find(v=>v.date===date.value && v.time===time.value && v.status!=='취소');
  if(exist){
    alert('해당 시간 예약 마감');
    formWrap.classList.add('hidden');
  }else{
    formWrap.classList.remove('hidden');
  }
});

document.querySelectorAll('input[type=checkbox], #size').forEach(el=>{
  el.addEventListener('change',calc);
});

function calc(){
  let sum=(document.getElementById('size').value||0)*14000;
  sum+=getBase();
  document.querySelectorAll('input[type=checkbox]:checked').forEach(c=>{
    sum+=parseInt(c.value);
  });
  totalSpan.innerText=sum.toLocaleString();
}

function save(){
  const data=getData();
  data.push({
    date:date.value,
    time:time.value,
    name:document.getElementById('name').value,
    phone:document.getElementById('phone').value,
    total:totalSpan.innerText,
    status:'대기',
    staff:''
  });
  setData(data);
  alert('접수 완료');
  formWrap.classList.add('hidden');
  date.value='';
}
