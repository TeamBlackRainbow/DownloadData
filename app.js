//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/bloomberg';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // Get the documents collection
    var collection = db.collection('Items');

    //Create some users

const AWS_REGION = 'us-east-1';

var aws = require('aws-sdk');
aws.config.update({
    region: AWS_REGION
});
var awsdb = new aws.DynamoDB.DocumentClient();

var params = {
    TableName: '2013',
    KeyConditionExpression: '#t = :ticker and #d between :date1 and :date2',
    ExpressionAttributeNames: {
	'#t': 'Ticker',
	'#d': 'Date'
    },
    ExpressionAttributeValues: {
	':ticker': 'TSCO LN Equity',
	':date1': '2013-01-01',
	':date2': '2013-06-02'
    }
};

awsdb.query(params, function(err, data) {
    if (err)
	console.log(err, err.stack);
    else
	console.log(data['Items']);
collection.insert(data['Items'], function (err, result) {
      if (err) {
        console.log(err);
      }
      //Close connection
      db.close();
    });

    // Insert some users

});









  }
});


