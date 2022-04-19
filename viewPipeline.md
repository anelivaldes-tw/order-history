## Pipeline to create **orderhistories** view(aggregate)

```bash
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    '$lookup': {
      'from': 'orders', 
      'localField': 'customerId', 
      'foreignField': 'customerId', 
      'as': 'orders', 
      'pipeline': [
        {
          '$match': {
            '$or': [
              {
                'state': 'ORDER_APPROVED'
              }, {
                'state': 'ORDER_REJECTED'
              }
            ]
          }
        }, {
          '$unset': [
            '__v', '_id', 'customerId', 'product_variation'
          ]
        }
      ]
    }
  }, {
    '$match': {
      'orders': {
        '$ne': []
      }
    }
  }, {
    '$unset': [
      '_id', '__v'
    ]
  }
];

MongoClient.connect(
  'mongodb://citizix:S3cret@localhost:27017/?authSource=admin&readPreference=primary&ssl=false&directConnection=true',
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(connectErr, client) {
    assert.equal(null, connectErr);
    const coll = client.db('order-history').collection('customers');
    coll.aggregate(agg, (cmdErr, result) => {
      assert.equal(null, cmdErr);
    });
    client.close();
  });
```