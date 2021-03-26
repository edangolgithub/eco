const identity = require("./UserSdk")
const users = require("./user-management");

module.exports.hello = async (event) => {
  //const body = JSON.parse(event.body); // for api gate way
  const body = event; // forlambda only without apigateway

  switch (body.fun) {
    case "signUp":
      var data = await signUp(body.username, body.password, body.email)
      break;
    case "signIn":
      var data = await signIn(body.username, body.password)
      break;
    case "forgotPassword":
      var data = await forgotPassword(body.username, body.email)
      break;
    case "forgotPasswordSubmit":
      var data = await forgotPasswordSubmit(body.username, body.email, body.verificationcode, body.newpassword)
      break;
    case "currentSession":
      var data = await currentSession();
      break;
    case "getCurrentUser":
      var data = await getCurrentUser()
      break;
    case "listUsers":
      var data = await listUsers()
      break;
    case "listGroups":
      var data = await listGroups()
      break;

  }
  const response = {
    statusCode: 200,
    body: JSON.stringify(data),
    headers: { 'Access-Control-Allow-Origin': '*' }
  };
  return response;
};

const signUp = async (username, password, email) => {
  try {
    var d = await users.signUp(username, password, email);
    console.log(username)
    //return createResponse({ message: "Created" }, 201);
    return d;
  } catch (e) {
    console.log(e);
    return e;
  }
};

const signIn = async (username, password) => {
  try {
    const token = await users.signIn(username, password);
    return token;
  } catch (e) {
    console.log(e);
    return e;
  }
};
// const forgotPassword = async (email) => {
//   try {
//     const data = await users.forgotPassword(email);
//     return data;
//   } catch (e) {
//     console.log(e);
//     return e;
//   }
// };
// const forgotPasswordSubmit = async (username, email, verificationcode, newpassword) => {
//   try {
//     const data = await users.forgotPasswordSubmit(username, email, verificationcode, newpassword);
//     return data;
//   } catch (e) {
//     console.log(e);
//     return e;
//   }
// };


const currentSession = async () => {
  try {
    const data = await users.currentSession();
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};
const getCurrentUser = async () => {
  try {
    var user = await signIn("edangol", "97ni@123Ui")
    const data = await users.getCurrentUser();
    console.log(data)
    return user;
  } catch (e) {
    console.log(e);
    return e;
  }
};
const listUsers = async () => {
  try {
    const data = await identity.test();
    console.log(data)
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};
const listGroups = async () => {
  try {
    const data = await identity.listGroups();
    console.log(data)
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};




















// const createResponse = (
//   data = { message: "OK" },
//   statusCode = 200
// ) => ({
//   statusCode,
//   body: JSON.stringify(data),
//   headers: { "Access-Control-Allow-Origin": "*" }
// });