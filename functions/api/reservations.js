export async function onRequestPost(context){

 const data = await context.request.json();

 await context.env.DB.prepare(`
 INSERT INTO reservations
 (date,time_slot,category,size,price,name,address,phone,request)
 VALUES (?,?,?,?,?,?,?,?,?)
 `)
 .bind(
  data.date,
  data.time_slot,
  data.category,
  data.size,
  data.price,
  data.name,
  data.address,
  data.phone,
  data.request
 )
 .run();

 return new Response("ok");

}