export async function onRequestPost(context) {
  const formData = await context.request.formData();

  const name = formData.get("name");
  const phone = formData.get("phone");
  const message = formData.get("message");

  console.log({ name, phone, message });

  return new Response("OK", { status: 200 });
}
