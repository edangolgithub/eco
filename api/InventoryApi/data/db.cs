using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.DocumentModel;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace InventoryApi.data
{

    public interface IInventoryRepsitory
    {
        Task<IEnumerable<Inventory>> AllInventorys();
        Task AddInventory(Inventory entity);
        Task DeleteInventory(string id);
        Task UpdateInventory(Inventory entity);


    }
    public class InventoryRepsitory : IInventoryRepsitory
    {
        private readonly AmazonDynamoDBClient _client;
        private readonly DynamoDBContext _context;

        public InventoryRepsitory()
        {
            _client = new AmazonDynamoDBClient();
            _context = new DynamoDBContext(_client);
        }

        public async Task<IEnumerable<Inventory>> AllInventorys()
        {
            var table = _context.GetTargetTable<Inventory>();
            var scanConditions = new List<ScanCondition>() { new ScanCondition("Id", ScanOperator.IsNotNull) };
            var searchResults = _context.ScanAsync<Inventory>(scanConditions, null);
            return (IEnumerable<Inventory>)await searchResults.GetNextSetAsync();
        }

        public async Task DeleteInventory(string id)
        {
            await _context.DeleteAsync<Inventory>(id);
        }

        public async Task UpdateInventory(Inventory entity)
        {
            await _context.SaveAsync<Inventory>(entity);
        }


        public async Task AddInventory(Inventory entity)
        {
            entity.Id
             = Guid.NewGuid().ToString();
            entity.EntryDate = DateTime.Now.ToShortTimeString();
            await _context.SaveAsync<Inventory>(entity);
        }

    }
}

