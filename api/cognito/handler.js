const users = require("./user-management");

module.exports.hello = async (event) => {
  const body = JSON.parse(event.body);
  //const body=event;
  if (event.path === "signup") 
  return signUp(body);
  return signIn(body);
};

const signUp = async ({ username, password,email }) => {
  try {
    await users.signUp(username, password,email);
    console.log(username)
    return createResponse({ message: "Created" }, 201);
  } catch (e) {
    console.log(e);
    return createResponse({ message: e.message }, 400);
  }
};

const signIn = async ({ username, password }) => {
  try {
    const token = await users.signIn(username, password);
    return createResponse({ token }, 201);
  } catch (e) {
    console.log(e);
    return createResponse({ message: e.message }, 400);
  }
};

const createResponse = (
  data = { message: "OK" },
  statusCode = 200
) => ({
  statusCode,
  body: JSON.stringify(data),
  headers: { "Access-Control-Allow-Origin": "*" }
});