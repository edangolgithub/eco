using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.DocumentModel;
using Amazon.DynamoDBv2.Model;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace InventoryApi.data
{

    public interface IInventoryRepsitory
    {
        Task<IEnumerable<Inventory>> AllInventorys();
        Task<IEnumerable<Inventory>> GetAllInventorysByCategory(string site);
        Task AddInventory(Inventory entity);
        Task DeleteInventory(string id);
        Task UpdateInventory(Inventory entity);


    }
    public class InventoryRepsitory : IInventoryRepsitory
    {
        private readonly AmazonDynamoDBClient _client;
        private readonly DynamoDBContext _context;

        public async Task<IEnumerable<Inventory>> GetAllInventorysByCategory(string site)
        {
            var table = _context.GetTargetTable<Inventory>();
            DynamoDBContext context = new DynamoDBContext(_client);

            DynamoDBOperationConfig confi = new DynamoDBOperationConfig()
            {
                IndexName = "site_index",
                ConsistentRead = false,
                OverrideTableName = "Inventory"
            };
            //         QueryRequest queryRequest = new QueryRequest
            //         {
            //             TableName = "Inventory",
            //             IndexName = "site_index",
            //             KeyConditionExpression = "#dt = :v_date ",
            //             ExpressionAttributeNames = new Dictionary<String, String> {
            //     {"#dt", "Site"}
            // },
            //             ExpressionAttributeValues = new Dictionary<string, AttributeValue> {
            //     {":v_date", new AttributeValue { S =  site }},

            // },
            //             ScanIndexForward = true
            //         };
            //  var scanConditions = new List<ScanCondition>() { new ScanCondition("Id", ScanOperator.IsNotNull) };
            //var searchResults = _context.QueryAsync<Inventory>(scanConditions, null);
            var searchResults = _context.QueryAsync<Inventory>(site, confi);
            //var searchResults=await _client.QueryAsync(queryRequest);

            // return (IEnumerable<Inventory>) searchResults.Items;
            return (IEnumerable<Inventory>)await searchResults.GetNextSetAsync();

        }

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
             entity.State=1;
            entity.EntryDate = DateTime.Now.ToShortDateString();
            await _context.SaveAsync<Inventory>(entity);
        }

    }
}

