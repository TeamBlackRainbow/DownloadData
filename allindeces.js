//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
var index = ['III', 'ABF', 'ADN', 'ADM', 'AAL', 'ANTO', 'ARM', 'AHT', 'AZN', 'AV/', 'BAB', 'BA/', 'BARC', 'BDEV', 'BKG', 'BG/', 'BLT', 'BP/', 'BATS', 'BLND','BT/A', 'BNZL', 'BRBY', 'CPI', 'CCL', 'CNA' ,'CCH', 'CPG', 'CRH', 'DGE', 'DLG', 'DC/', 'EZJ', 'EXPN', 'FRES', 'GFS', 'GKN', 'GSK', 'GLEN', 'HMSO', 'HL/', 'HIK', 'HSBA', 'IMT', 'ISAT', 'IHG', 'ITRK', 'IAG', 'INTU', 'ITV', 'JMAT', 'KGF', 'LAND', 'LGEN', 'LLOY', 'LSE', 'MKS', 'MGGT', 'MERL', 'MNDI', 'MRW', 'NG/', 'NXT', 'OML', 'PSON', 'PSN', 'PRU', 'RRS', 'RDSA', 'RDSB', 'RB/', 'REL', 'RIO', 'RR/', 'RBS','RMG','RSA','SAB','SGE','SBRY','SDR','SVT','SHP','SKY','SN/','SMIN','SPD','SSE','STJ','STAN','SL','TW/', 'TSCO', 'TPK', 'TUI', 'ULVR', 'UU/', 'VOD', 'WTB', 'WOS', 'WPP'];
//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

var led = require('./led-strip.js');

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/bloomberg';

var things = [];

// Use connect method to connect to the Server

const AWS_REGION = 'us-east-1';

var aws = require('aws-sdk');
aws.config.update({
    region: AWS_REGION
});
var awsdb = new aws.DynamoDB.DocumentClient();

for (i = 0; i < 87; i++) {

      //Create some users

  var params = {
      TableName: '2013',
      KeyConditionExpression: '#t = :ticker and #d between :date1 and :date2',
      ExpressionAttributeNames: {
    '#t': 'Ticker',
    '#d': 'Date'
      },
      ExpressionAttributeValues: {
    ':ticker': index[i]+' LN Equity',
    ':date1': '2013-01-01',
    ':date2': '2013-06-02'
      }
  };

  awsdb.query(params, function(err, data) {
    if (err)
      console.log(err, err.stack);
    else
      console.log(data['Items']);

      things.push(data['Items']);

      // Insert some users

  });

}

setTimeout(function() {
  console.log(things.length);

  for(var i = 1; i < 180; i++) {

    for(var j = 0; j < 87; j++) {
      if(things[j]) {
        if(things[j][i]) {
          if(things[j][i].High > things[j][i-1].High) {
            led.setPixel(j, 0, 255, 0);
          } else {
            led.setPixel(j, 255, 0, 0);
          }
        } else {
          led.setPixel(j, 0, 0, 255);
        }
      } else {
        led.setPixel(j, 0, 0, 255);
      }


    }

  }
}, 2000);
