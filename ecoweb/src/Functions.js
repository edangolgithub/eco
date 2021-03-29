import axios from 'axios'
export const getinventorybycategory =async (cat) => {
    const data = 
    await axios.get('https://nkys95a4t0.execute-api.us-east-1.amazonaws.com/Prod/api/inventory/site/'+cat)
    //console.log(data.data)
    return await data.data;

}
export const getallinventories = async () => {
    const data = await axios.get('https://nkys95a4t0.execute-api.us-east-1.amazonaws.com/Prod/api/inventory')
  //console.log(data.data)
    return await data.data;


}