function updatePrice(){

 const pricePer = document.getElementById("category").value;

 const size = document.getElementById("size").value;

 const total = pricePer * size;

 document.getElementById("priceInfo").innerText =
 "예상금액: "+total+"원";

}

async function submitReservation(){

 const category = document.getElementById("category");

 const size = document.getElementById("size").value;

 const pricePer = category.value;

 const total = pricePer * size;

 await fetch("/api/reservations",{

  method:"POST",

  body:JSON.stringify({

   date:window.selectedDate,
   time_slot:"AM",
   category:category.options[category.selectedIndex].text,
   size,
   price:total,
   name:name.value,
   address:address.value,
   phone:phone.value,
   request:request.value

  })

 });

 alert("예약완료");

 location.reload();

}