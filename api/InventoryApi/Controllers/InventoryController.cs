using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using InventoryApi.data;
using Microsoft.AspNetCore.Authorization;

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
            var data = await _repository.AllInventorys();

            return data.OrderByDescending(a => a.PurchasedDate);
        }
        [Route("site/{site}", Name = "getById")]
        public async Task<IEnumerable<Inventory>> Get(string site)
        {
            var data = await _repository.GetAllInventorysByCategory(site);

            return data.OrderByDescending(a => a.PurchasedDate);
        }
         [Authorize]
        [HttpPost]
        public async Task Post([FromBody] Inventory model)
        {
            if (model == null)
            {
                return;
            }
            await _repository.AddInventory(model);
        }
        [Authorize]
        [HttpPut]
        public async Task PutAsync([FromBody] Inventory entity)
        {
            await _repository.UpdateInventory(entity);
        }
        [Authorize]
        [HttpDelete("{id}")]
        public async Task DeleteAsync(string id)
        {
            await _repository.DeleteInventory(id);
        }


    }
}
