export async function onRequestPost(context){

 const {id} = await context.request.json();

 await context.env.DB.prepare(
 "DELETE FROM reservations WHERE id=?"
 ).bind(id).run();

 return new Response("ok");

}