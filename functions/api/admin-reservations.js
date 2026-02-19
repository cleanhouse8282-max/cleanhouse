export async function onRequestGet(context){

 const result = await context.env.DB.prepare(
 "SELECT * FROM reservations ORDER BY date"
 ).all();

 return Response.json(result.results);

}