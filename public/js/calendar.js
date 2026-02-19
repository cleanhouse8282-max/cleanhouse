document.addEventListener('DOMContentLoaded', async function() {

 const calendarEl = document.getElementById('calendar');

 const res = await fetch('/api/availability');
 const data = await res.json();

 const events = data.map(r => ({
  title: r.time_slot,
  start: r.date
 }));

 const calendar = new FullCalendar.Calendar(calendarEl, {

  initialView: 'dayGridMonth',

  dateClick: function(info){

    window.selectedDate = info.dateStr;

    document.getElementById("form").style.display="block";

  },

  events: events

 });

 calendar.render();

});