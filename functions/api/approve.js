export async function onRequestPost(context){

 const {id} = await context.request.json();

 await context.env.DB.prepare(
 "UPDATE reservations SET status='approved' WHERE id=?"
 ).bind(id).run();

 return new Response("ok");

}