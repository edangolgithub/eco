using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using InventoryApi.data;
namespace InventoryApi.Controllers
{
    [Route("api/[controller]")]
    
    public class InventoryController : ControllerBase
    {
        private IInventoryRepsitory _repository;

        public InventoryController(IInventoryRepsitory repository)
        {
            _repository = repository;
        }
        public async Task<IEnumerable<Inventory>> Get()
        {
            var data= await _repository.AllInventorys();
              
            return  data.OrderByDescending(a=>a.PurchasedDate);
        }

        [HttpPost]
        public async Task Post([FromBody]Inventory model)
        {
           if(model==null)
           {
               return;
           }
            await _repository.AddInventory(model);
        }
        [HttpPut]
        public async Task PutAsync([FromBody] Inventory entity)
        {
             await _repository.UpdateInventory(entity);
        }
        [HttpDelete("{id}")]
        public async Task DeleteAsync(string id)
        {
            await _repository.DeleteInventory(id);
        }


    }
}
