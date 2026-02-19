export async function onRequestPost(context){

 const data = await context.request.json();

 const result = await context.env.DB.prepare(
 "SELECT * FROM admin WHERE username=? AND password=?"
 )
 .bind(data.username,data.password)
 .first();

 if(result)
  return new Response("ok");

 return new Response("fail",{status:401});

}