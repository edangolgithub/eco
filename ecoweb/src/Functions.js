import axios from 'axios'
export const getinventorybycategory =async (cat) => {
    const data = 
    await axios.get('https://5w9ovuk4sh.execute-api.us-east-1.amazonaws.com/api/inventory/site/'+cat)
    //console.log(data.data)
    return await data.data;

}
export const getallinventories = async () => {
    const data = await axios.get('https://5w9ovuk4sh.execute-api.us-east-1.amazonaws.com/api/inventory')
  //console.log(data.data)
    return await data.data;


}
export const getallinventoriesbyuser = async (user) => {
  const data = await axios.get('https://5w9ovuk4sh.execute-api.us-east-1.amazonaws.com/api/inventory')
  var udata=data.data.filter(u=>u.user===user)
  return await udata;


}
export const getallinventoriesbystore = async (store) => {
  const data = await axios.get('https://5w9ovuk4sh.execute-api.us-east-1.amazonaws.com/api/inventory')
  var sdata=data.data.filter(u=>u.purchasedStore.toLowerCase().includes(store.toLowerCase()))

  return await sdata;


}