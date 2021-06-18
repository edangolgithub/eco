import axios from "axios";
export const getinventorybycategory = async (cat) => {
  const data = await axios.get(
    "https://5w9ovuk4sh.execute-api.us-east-1.amazonaws.com/api/inventory/site/" +
      cat
  );
  //console.log(data.data)
  return await data.data;
};
export const getallinventories = async () => {
  const data = await axios.get(
    "https://5w9ovuk4sh.execute-api.us-east-1.amazonaws.com/api/inventory"
  );
  //console.log(data.data)
  return await data.data;
};
export const getallinventoriesbyuser = async (user) => {
  const data = await axios.get(
    "https://5w9ovuk4sh.execute-api.us-east-1.amazonaws.com/api/inventory"
  );
  var udata = data.data.filter((u) => u.user === user);
  return await udata;
};
export const getallinventoriesbystore = async (store) => {
  const data = await axios.get(
    "https://5w9ovuk4sh.execute-api.us-east-1.amazonaws.com/api/inventory"
  );
  var sdata = data.data.filter((u) =>
    u.purchasedStore.toLowerCase().includes(store.toLowerCase())
  );

  return await sdata;
};

export const deleteinventory = async (id) => {
  let config = {
    headers: {
      Authorization: "Bearer " + global.token,
    },
  };
  console.log(id);

  const data = await axios
    .delete(
      "https://5w9ovuk4sh.execute-api.us-east-1.amazonaws.com/api/inventory/" +
        id,
      config
    )
    .then((response) => {
      console.log(response);
    })
    .catch((er) => {
      console.log(er.response);
      if (er.response.status === 403 || er.response.status === 401) {
        alert("you are not authorized (contact Admin for adding privilege)");
      } else {
        alert(er);
      }
    });
  return await data;
};

export const isAdminorManager = () => {
  var isadmin = false;
  var us = sessionStorage.getItem("user");
  if (us) {
    let usdata = JSON.parse(us);
    var role = usdata.accessToken.payload["cognito:groups"];
    // role.forEach((element) => {
    //   if (element.includes("Admin") || element.includes("Manager")) {
    //    isadmin=true;
    //    break;
    //   }
    // });
    for (const element of role) {
      if (element.includes("Admin") || element.includes("Manager")) {
        isadmin = true;
        break;
      }
    }
  }
  return isadmin;
};
