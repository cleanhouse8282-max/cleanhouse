
function getData(){return JSON.parse(localStorage.getItem('reserveData')||'[]');}
function setData(d){localStorage.setItem('reserveData',JSON.stringify(d));}
function getHoliday(){return JSON.parse(localStorage.getItem('holiday')||'[]');}
function setHoliday(d){localStorage.setItem('holiday',JSON.stringify(d));}

const list=document.getElementById('list');
const monthInput=document.getElementById('month');
const calendar=document.getElementById('calendar');

// base price
function saveBase(){
  localStorage.setItem('basePrice',document.getElementById('basePrice').value);
  alert('저장');
}

// holiday
function addHoliday(){
  const d=getHoliday();
  d.push(document.getElementById('holiday').value);
  setHoliday(d);
  renderHoliday();
}

function renderHoliday(){
  const wrap=document.getElementById('holidayList');
  wrap.innerHTML='';
  getHoliday().forEach(v=>{
    const div=document.createElement('div');
    div.className='day';
    div.innerText=v;
    wrap.appendChild(div);
  });
}
renderHoliday();

// calendar
monthInput.addEventListener('change',()=>{
  calendar.innerHTML='';
  getData().filter(v=>v.date.startsWith(monthInput.value)).forEach(v=>{
    const div=document.createElement('div');
    div.className='day';
    div.innerText=v.date+' '+v.time+' '+v.status;
    calendar.appendChild(div);
  });
});

// staff overlap check
function setStaff(i,val){
  const data=getData();
  const target=data[i];
  const overlap=data.find((v,idx)=>idx!==i && v.staff===val && v.date===target.date && v.time===target.time && v.status==='확정');
  if(overlap){
    alert('이미 배정된 시간');
    return;
  }
  data[i].staff=val;
  setData(data);
}

function confirmPay(i){
  const data=getData();
  if(!data[i].staff){ alert('직원 먼저 배정'); return;}
  data[i].status='확정';
  setData(data);
  renderList();
}

function renderList(){
  list.innerHTML='';
  getData().forEach((v,i)=>{
    const div=document.createElement('div');
    div.className='day';
    div.innerHTML=`
    <b>${v.date}</b> ${v.time} / ${v.name} / ${v.total}원
    <br>상태:${v.status}
    <input placeholder="직원명" value="${v.staff||''}" onchange="setStaff(${i},this.value)">
    <button onclick="confirmPay(${i})">확정</button>
    `;
    list.appendChild(div);
  });
}
renderList();
