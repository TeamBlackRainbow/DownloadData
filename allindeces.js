//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
var index = ['III', 'ABF', 'ADN', 'ADM', 'AAL', 'ANTO', 'ARM', 'AHT', 'AZN', 'AV/', 'BAB', 'BA/', 'BARC', 'BDEV', 'BKG', 'BG/', 'BLT', 'BP/', 'BATS', 'BLND','BT/A', 'BNZL', 'BRBY', 'CPI', 'CCL', 'CNA' ,'CCH', 'CPG', 'DGE', 'DLG', 'DC/', 'EZJ', 'EXPN', 'FRES', 'GFS', 'GKN', 'GSK', 'GLEN', 'HMSO', 'HL/', 'HIK', 'HSBA', 'IMT', 'ISAT', 'IHG', 'ITRK', 'IAG', 'INTU', 'ITV', 'JMAT', 'KGF', 'LAND', 'LGEN', 'LLOY', 'LSE']
var index2 = [ 'MNDI', 'MRW', 'NXT', 'OML', 'PSON', 'PSN', 'RRS', 'REL', 'RIO', 'RBS','RSA','SDR','SVT','SHP','SKY','SN/','SMIN','SPD','SSE','STJ','STAN', 'TSCO', 'TPK', 'TUI', 'ULVR', 'UU/', 'VOD', 'WOS', 'WPP']
//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/bloomberg';

var data1 = [];

// Use connect method to connect to the Server

const AWS_REGION = 'us-east-1';

var aws = require('aws-sdk');
aws.config.update({
    region: AWS_REGION
});
var awsdb = new aws.DynamoDB.DocumentClient();

for (i = 0; i < 100; i++) { 
  MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // Get the documents collection
    var collection = db.collection('Items');

    //Create some users

var params = {
    TableName: '2013',
    KeyConditionExpression: '#t = :ticker and #d between :date1 and :date2',
    ExpressionAttributeNames: {
  '#t': 'Ticker',
  '#d': 'Date'
    },
    ExpressionAttributeValues: {
  ':ticker': index2[i]+' LN Equity',
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
      
    });

    // Insert some users

});



db.close();

}
 
 
});
}


